/*
  Warnings:

  - You are about to drop the column `user_id` on the `reservations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "reservations" DROP CONSTRAINT "reservations_user_id_fkey";

-- AlterTable
ALTER TABLE "reservations" DROP COLUMN "user_id",
ADD COLUMN     "vehicle_id" INTEGER;

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "license" TEXT NOT NULL,
    "vehicle_type" "VEHICLE_TYPE" NOT NULL DEFAULT E'LARGE',

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
