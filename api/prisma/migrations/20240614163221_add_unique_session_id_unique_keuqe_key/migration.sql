/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `Bill` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Bill_sessionId_key` ON `Bill`(`sessionId`);
