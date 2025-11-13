-- CreateEnum
CREATE TYPE "public"."ExerciseStatus" AS ENUM ('CONFIRMED', 'PENDING', 'DECLINED');

-- AlterTable
ALTER TABLE "public"."Exercise" ADD COLUMN     "status" "public"."ExerciseStatus" NOT NULL DEFAULT 'PENDING';
