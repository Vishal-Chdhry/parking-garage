-- CreateEnum
CREATE TYPE "VEHICLE_TYPE" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "SPOT_STATUS" AS ENUM ('BOOKED', 'RESERVED', 'EMPTY');

-- CreateTable
CREATE TABLE "garage" (
    "id" SERIAL NOT NULL,
    "zipcode" TEXT NOT NULL,
    "rate_reg" DECIMAL(65,30) NOT NULL,
    "rate_large" DECIMAL(65,30) NOT NULL,
    "rate_medium" DECIMAL(65,30) NOT NULL,
    "rate_small" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "garage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spots" (
    "id" SERIAL NOT NULL,
    "vehicle_type" "VEHICLE_TYPE" NOT NULL DEFAULT E'LARGE',
    "status" "SPOT_STATUS" NOT NULL DEFAULT E'EMPTY',
    "garage_id" INTEGER NOT NULL,

    CONSTRAINT "spots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservations" (
    "id" SERIAL NOT NULL,
    "garage_id" INTEGER NOT NULL,
    "spot_id" INTEGER NOT NULL,
    "start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end" TIMESTAMP(3) NOT NULL,
    "paid" BOOLEAN NOT NULL,
    "user_id" INTEGER,

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "spots" ADD CONSTRAINT "spots_garage_id_fkey" FOREIGN KEY ("garage_id") REFERENCES "garage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_garage_id_fkey" FOREIGN KEY ("garage_id") REFERENCES "garage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_spot_id_fkey" FOREIGN KEY ("spot_id") REFERENCES "spots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
