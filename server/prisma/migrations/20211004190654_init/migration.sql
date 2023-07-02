-- CreateTable
CREATE TABLE "mood" (
    "id" SERIAL NOT NULL,
    "emotion" TEXT NOT NULL,
    "date" TIMESTAMP(6) NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,

    CONSTRAINT "PK_cd069bf46deedf0ef3a7771f44b" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mood_tags_tag" (
    "moodId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "PK_eb8ec461f98999f683d7f927587" PRIMARY KEY ("moodId","tagId")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT E'',
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,

    CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "authId" VARCHAR NOT NULL,
    "nickname" VARCHAR,
    "email" VARCHAR NOT NULL,
    "pictureUrl" VARCHAR NOT NULL,
    "settings" JSONB NOT NULL DEFAULT E'{"hasCompanion": false, "hasGoogleFitness": false, "hasFinishedTutorial": false}',
    "refreshToken" VARCHAR NOT NULL DEFAULT E'',
    "lastLogin" TIMESTAMP(6) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "longestStreak" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IDX_7b0ca4cb0ef7a3bdc1364aaded" ON "mood_tags_tag"("moodId");

-- CreateIndex
CREATE INDEX "IDX_b57f58319074f0d9228e0c1a55" ON "mood_tags_tag"("tagId");

-- CreateIndex
CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user"("email");

-- AddForeignKey
ALTER TABLE "mood" ADD CONSTRAINT "FK_063b678cbb2c84dfd95dff5da22" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mood_tags_tag" ADD CONSTRAINT "FK_7b0ca4cb0ef7a3bdc1364aaded1" FOREIGN KEY ("moodId") REFERENCES "mood"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mood_tags_tag" ADD CONSTRAINT "FK_b57f58319074f0d9228e0c1a552" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tag" ADD CONSTRAINT "FK_d0dc39ff83e384b4a097f47d3f5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
