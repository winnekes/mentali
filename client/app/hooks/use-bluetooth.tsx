import { createContext, FunctionComponent, useContext, useState } from "react";

const serviceUuid = process.env.NEXT_PUBLIC_BLUETOOTH_SERVICE_UUID ?? "";
const commandCharacteristicUuid = process.env.NEXT_PUBLIC_BLUETOOTH_COMMAND_UUID ?? "";
const faceCharacteristicUuid = process.env.NEXT_PUBLIC_BLUETOOTH_FACE_UUID ?? "";

type Context = {
  connect: () => void;
  restart: () => void;
  disconnect: () => void;
  changeName: (name: string) => void;
  changeFace: (faceInHex: string) => void;
  deviceName: string;
  state: { connected: boolean; error: boolean };
};

const BluetoothContext = createContext<Context | null>(null);

export const BluetoothContextProvider: FunctionComponent = ({ children }) => {
  const [connection, setConnection] = useState<BluetoothRemoteGATTServer>();
  const [service, setService] = useState<BluetoothRemoteGATTService>();
  const [deviceName, setDeviceName] = useState("");
  const [deviceFace, setDeviceFace] = useState("");
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(false);

  const textEncoder = new TextEncoder();

  const connect = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: false,
        filters: [{ services: [serviceUuid] }],
      });

      setDeviceName(device?.name || "");
      const server = await device.gatt?.connect();
      if (server) {
        setConnection(server);
        const primaryService = await server.getPrimaryService(serviceUuid);
        if (primaryService) {
          setService(primaryService);
        }
      }
      setConnected(true);
      setError(false);
    } catch (e) {
      setError(e);
    }
  };

  const sendCommand = async (command: string) => {
    try {
      if (connection && service) {
        const commandCharacteristic = await service.getCharacteristic(commandCharacteristicUuid);

        await commandCharacteristic.writeValue(textEncoder.encode(command));
      }
      setError(false);
    } catch (e) {
      setError(e);
    }
  };

  const restart = async () => {
    try {
      if (connection && service) {
        await sendCommand("RESTART");
      }
      setError(false);
    } catch (e) {
      setError(e);
    }
  };

  const disconnect = () => {
    if (connection) {
      connection.disconnect();
      setDeviceName("");
      setService(undefined);
      setConnection(undefined);
      setConnected(false);
    }
  };

  const changeName = async (name: string) => {
    try {
      if (connection && service) {
        await sendCommand("CONFIGR NAME " + name);
        setDeviceName(name);
      }
      setTimeout(() => connect(), 2000);
      setError(false);
    } catch (e) {
      setError(e);
    }
  };

  const changeFace = async (faceInHex: string) => {
    try {
      if (connection && service) {
        const characteristic = await service.getCharacteristic(faceCharacteristicUuid);

        const result = faceInHex.match(/[\da-f]{2}/gi) || [];
        const typedArray = new Uint8Array(
          result.map(function (h) {
            return parseInt(h, 16);
          })
        );

        await characteristic.writeValue(typedArray.buffer);
      }
      setError(false);
    } catch (e) {
      setError(e);
    }
  };

  return (
    <BluetoothContext.Provider
      value={{
        connect,
        restart,
        disconnect,
        changeName,
        changeFace,
        deviceName,
        state: { connected, error },
      }}
    >
      {children}
    </BluetoothContext.Provider>
  );
};

export const useBluetooth = () => {
  const data = useContext(BluetoothContext);
  if (!data) {
    throw new Error("Must be used inside provider");
  }
  return data;
};
