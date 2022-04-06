/*
  Warnings:

  - The values [MEDIUM] on the enum `VEHICLE_TYPE` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "VEHICLE_TYPE_new" AS ENUM ('SMALL', 'LARGE');
ALTER TABLE "Vehicle" ALTER COLUMN "vehicle_type" DROP DEFAULT;
ALTER TABLE "spots" ALTER COLUMN "vehicle_type" DROP DEFAULT;
ALTER TABLE "spots" ALTER COLUMN "vehicle_type" TYPE "VEHICLE_TYPE_new" USING ("vehicle_type"::text::"VEHICLE_TYPE_new");
ALTER TABLE "Vehicle" ALTER COLUMN "vehicle_type" TYPE "VEHICLE_TYPE_new" USING ("vehicle_type"::text::"VEHICLE_TYPE_new");
ALTER TYPE "VEHICLE_TYPE" RENAME TO "VEHICLE_TYPE_old";
ALTER TYPE "VEHICLE_TYPE_new" RENAME TO "VEHICLE_TYPE";
DROP TYPE "VEHICLE_TYPE_old";
ALTER TABLE "Vehicle" ALTER COLUMN "vehicle_type" SET DEFAULT 'LARGE';
ALTER TABLE "spots" ALTER COLUMN "vehicle_type" SET DEFAULT 'LARGE';
COMMIT;
