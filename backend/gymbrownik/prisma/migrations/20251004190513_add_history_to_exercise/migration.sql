-- CreateEnum
CREATE TYPE "public"."BodyPart" AS ENUM ('CHEST', 'BACK', 'SHOULDERS', 'BICEPS', 'TRICEPS', 'FOREARMS', 'ABS', 'QUADRICEPS', 'HAMSTRINGS', 'GLUTES', 'CALVES');

-- AlterTable
ALTER TABLE "public"."Exercise" ADD COLUMN     "bodyPart" "public"."BodyPart";

-- AlterTable
ALTER TABLE "public"."WorkoutExercise" ADD COLUMN     "history" JSONB;
