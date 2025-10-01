/*
  Warnings:

  - You are about to drop the column `reps` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `rest` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `series` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `workoutId` on the `Exercise` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Exercise" DROP CONSTRAINT "Exercise_workoutId_fkey";

-- AlterTable
ALTER TABLE "public"."Exercise" DROP COLUMN "reps",
DROP COLUMN "rest",
DROP COLUMN "series",
DROP COLUMN "weight",
DROP COLUMN "workoutId";

-- CreateTable
CREATE TABLE "public"."WorkoutExercise" (
    "id" SERIAL NOT NULL,
    "series" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" DECIMAL(5,2) NOT NULL,
    "rest" INTEGER,
    "workoutId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,

    CONSTRAINT "WorkoutExercise_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "public"."Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "public"."Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
