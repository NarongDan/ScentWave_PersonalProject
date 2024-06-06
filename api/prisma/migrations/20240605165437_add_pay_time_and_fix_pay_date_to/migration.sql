/*
  Warnings:

  - You are about to drop the column `totalPrice` on the `bill` table. All the data in the column will be lost.
  - Added the required column `payTime` to the `Bill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bill` DROP COLUMN `totalPrice`,
    ADD COLUMN `payTime` VARCHAR(191) NOT NULL,
    MODIFY `payDate` DATETIME(3) NULL;
