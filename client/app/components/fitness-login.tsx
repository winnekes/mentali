import { Button } from "@chakra-ui/react";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { useSaveRefreshTokenMutation } from "../types/graphql";

export const FitnessLogin = () => {
  const [saveRefreshToken] = useSaveRefreshTokenMutation();

  const responseGoogle = async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if (response.code) {
      try {
        await saveRefreshToken({
          variables: { data: { authToken: response.code } },
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <GoogleLogin
      clientId={process.env.NEXT_PUBLIC_GOOGLE_FITNESS_CLIENT_ID || ""}
      buttonText="Login"
      render={renderProps => (
        <Button onClick={renderProps.onClick} disabled={renderProps.disabled} variant="primary">
          Sign into Google Fitness and allow access (required)
        </Button>
      )}
      accessType="offline"
      responseType="code"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy="single_host_origin"
      isSignedIn={true}
      prompt="consent"
      scope="https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.heart_rate.read https://www.googleapis.com/auth/fitness.sleep.read"
    />
  );
};
