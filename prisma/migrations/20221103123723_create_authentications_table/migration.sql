-- CreateTable
CREATE TABLE "authentications" (
    "token" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "authentications_token_key" ON "authentications"("token");
