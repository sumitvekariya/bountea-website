/*
  Warnings:

  - You are about to drop the column `safeAddress` on the `Connection` table. All the data in the column will be lost.
  - You are about to drop the column `slicerId` on the `Connection` table. All the data in the column will be lost.
  - Added the required column `bountyId` to the `Connection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletAddress` to the `Connection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Connection" DROP COLUMN "safeAddress",
DROP COLUMN "slicerId",
ADD COLUMN     "bountyId" INTEGER NOT NULL,
ADD COLUMN     "walletAddress" TEXT NOT NULL;
