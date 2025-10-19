/*
  Warnings:

  - The `code_type` column on the `codes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `hashed_refresh_token` on the `sessions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `user_ip` on the `sessions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(45)`.
  - You are about to alter the column `deviceId` on the `user_devices` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `device_name` on the `user_devices` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to drop the column `is_verified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `users` table. All the data in the column will be lost.
  - You are about to alter the column `numberIdentity` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `firstName` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `lastName` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `picture` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.
  - You are about to alter the column `provider` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - Changed the type of `provider` on the `oauth2_user` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userDeviceId` on the `sessions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."TypeMessage" AS ENUM ('TEXT', 'IMAGE', 'FILE', 'VOICE');

-- CreateEnum
CREATE TYPE "public"."provider" AS ENUM ('FACEBOOK', 'GOOGLE');

-- CreateEnum
CREATE TYPE "public"."code_type" AS ENUM ('VERIFICATION', 'PASSWORD_RESET', 'EMAIL_CHANGE', 'PHONE_CHANGE');

-- CreateEnum
CREATE TYPE "public"."status" AS ENUM ('ACTIVE', 'SOLTDELETE', 'PENDING');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."account_type" ADD VALUE 'FACEBOOK';
ALTER TYPE "public"."account_type" ADD VALUE 'LOCAL';
ALTER TYPE "public"."account_type" ADD VALUE 'SOCIAL';

-- AlterTable
ALTER TABLE "public"."codes" DROP COLUMN "code_type",
ADD COLUMN     "code_type" "public"."code_type" NOT NULL DEFAULT 'VERIFICATION';

-- AlterTable
ALTER TABLE "public"."oauth2_user" DROP COLUMN "provider",
ADD COLUMN     "provider" "public"."provider" NOT NULL,
ALTER COLUMN "avatar_url" SET DATA TYPE VARCHAR(1000);

-- AlterTable
ALTER TABLE "public"."sessions" DROP COLUMN "userDeviceId",
ADD COLUMN     "userDeviceId" UUID NOT NULL,
ALTER COLUMN "hashed_refresh_token" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "user_ip" SET DATA TYPE VARCHAR(45),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "public"."user_devices" ALTER COLUMN "deviceId" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "device_name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "is_verified",
DROP COLUMN "status",
ALTER COLUMN "avt_url" SET DATA TYPE VARCHAR(1000),
ALTER COLUMN "numberIdentity" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "dateOfBirth" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "firstName" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "lastName" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "picture" SET DATA TYPE VARCHAR(1000),
ALTER COLUMN "provider" SET DATA TYPE VARCHAR(50);

-- DropEnum
DROP TYPE "public"."CodeType";

-- DropEnum
DROP TYPE "public"."Provider";

-- DropEnum
DROP TYPE "public"."Status";

-- CreateTable
CREATE TABLE "public"."Message" (
    "id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "typeMessage" "public"."TypeMessage" NOT NULL DEFAULT 'TEXT',
    "senderId" UUID NOT NULL,
    "receiverId" UUID,
    "roomId" UUID NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Room" (
    "id" UUID NOT NULL,
    "clientId" UUID,
    "customerId" UUID NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MemberInRoom" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "roomId" UUID NOT NULL,

    CONSTRAINT "MemberInRoom_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sessions_userId_userDeviceId_key" ON "public"."sessions"("userId", "userDeviceId");

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "public"."Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MemberInRoom" ADD CONSTRAINT "MemberInRoom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MemberInRoom" ADD CONSTRAINT "MemberInRoom_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "public"."Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
