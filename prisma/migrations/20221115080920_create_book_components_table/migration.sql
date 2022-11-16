-- CreateTable
CREATE TABLE "book_components" (
    "id" UUID NOT NULL,
    "book_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "book_components_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "book_components" ADD CONSTRAINT "book_components_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
