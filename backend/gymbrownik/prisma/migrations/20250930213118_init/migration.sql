-- CreateEnum
CREATE TYPE "public"."AuthRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "public"."WorkoutType" AS ENUM ('PUSH_PULL_LEGS', 'UPPER_LOWER', 'FBW', 'SPLIT', 'CUSTOM');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TrainingWeek" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "workoutType" "public"."WorkoutType" NOT NULL,
    "restDays" INTEGER NOT NULL,
    "trainingDays" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "TrainingWeek_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TrainingDay" (
    "id" SERIAL NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "trainingWeekId" INTEGER NOT NULL,
    "workoutId" INTEGER NOT NULL,

    CONSTRAINT "TrainingDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Workout" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Exercise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "series" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" DECIMAL(5,2) NOT NULL,
    "rest" INTEGER,
    "workoutId" INTEGER NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."TrainingWeek" ADD CONSTRAINT "TrainingWeek_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TrainingDay" ADD CONSTRAINT "TrainingDay_trainingWeekId_fkey" FOREIGN KEY ("trainingWeekId") REFERENCES "public"."TrainingWeek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TrainingDay" ADD CONSTRAINT "TrainingDay_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "public"."Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Exercise" ADD CONSTRAINT "Exercise_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "public"."Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
