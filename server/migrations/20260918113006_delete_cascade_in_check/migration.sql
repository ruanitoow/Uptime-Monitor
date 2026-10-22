-- DropForeignKey
ALTER TABLE "Check" DROP CONSTRAINT "Check_monitorId_fkey";

-- AddForeignKey
ALTER TABLE "Check" ADD CONSTRAINT "Check_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "Monitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
