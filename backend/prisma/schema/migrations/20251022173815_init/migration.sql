/*
  Warnings:

  - You are about to drop the column `clientId` on the `Room` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[senderId,id]` on the table `Message` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[employeeId,customerId]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `MemberInRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."MemberInRoom" ADD COLUMN     "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ(6) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Message" ADD COLUMN     "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ(6) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Room" DROP COLUMN "clientId",
ADD COLUMN     "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "employeeId" UUID,
ADD COLUMN     "updatedAt" TIMESTAMPTZ(6) NOT NULL;

-- AlterTable
ALTER TABLE "public"."user_devices" ALTER COLUMN "device_name" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE INDEX "Message_senderId_id_idx" ON "public"."Message"("senderId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Message_senderId_id_key" ON "public"."Message"("senderId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Room_employeeId_customerId_key" ON "public"."Room"("employeeId", "customerId");
