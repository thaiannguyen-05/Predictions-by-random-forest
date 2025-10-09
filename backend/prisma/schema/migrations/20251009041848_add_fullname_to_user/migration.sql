-- CreateEnum
CREATE TYPE "public"."account_type" AS ENUM ('EMAIL', 'OAUTH2');

-- CreateEnum
CREATE TYPE "public"."Provider" AS ENUM ('FACEBOOK', 'GOOGLE');

-- CreateEnum
CREATE TYPE "public"."CodeType" AS ENUM ('VERIFICATION', 'PASSWORD_RESET', 'EMAIL_CHANGE', 'PHONE_CHANGE');

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('ACTIVE', 'SOLTDELETE', 'PENDING');

-- CreateEnum
CREATE TYPE "public"."user_visibility" AS ENUM ('PUBLIC', 'PRIVATE', 'CONTACT_ONLY');

-- CreateTable
CREATE TABLE "public"."user_devices" (
    "device_id" UUID NOT NULL,
    "deviceId" TEXT NOT NULL,
    "device_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "user_devices_pkey" PRIMARY KEY ("device_id")
);

-- CreateTable
CREATE TABLE "public"."sessions" (
    "session_id" UUID NOT NULL,
    "userDeviceId" TEXT NOT NULL,
    "hashed_refresh_token" TEXT,
    "userAgent" VARCHAR(1000),
    "user_ip" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "logined_at" TIMESTAMPTZ,
    "logouted_at" TIMESTAMPTZ,
    "userId" UUID NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("session_id")
);

-- CreateTable
CREATE TABLE "public"."codes" (
    "code_id" UUID NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "code_type" "public"."CodeType" NOT NULL DEFAULT 'VERIFICATION',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "codes_pkey" PRIMARY KEY ("code_id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" UUID NOT NULL,
    "fullname" VARCHAR(50) NOT NULL,
    "username" VARCHAR(250) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "hashed_password" VARCHAR(255),
    "account_type" "public"."account_type" NOT NULL DEFAULT 'EMAIL',
    "avt_url" VARCHAR(500),
    "address" VARCHAR(500),
    "city" VARCHAR(50),
    "state" VARCHAR(50) NOT NULL,
    "search_times" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "visible" "public"."user_visibility" NOT NULL DEFAULT 'PUBLIC',
    "status" "public"."Status" NOT NULL DEFAULT 'ACTIVE',
    "phone" VARCHAR(20),
    "numberIdentity" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "firstName" TEXT,
    "lastName" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "is_banned" BOOLEAN NOT NULL DEFAULT false,
    "is_locked" BOOLEAN NOT NULL DEFAULT false,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "last_actived" TIMESTAMPTZ,
    "picture" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."oauth2_user" (
    "id" UUID NOT NULL,
    "provider" "public"."Provider" NOT NULL,
    "provider_user_id" VARCHAR(500) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20),
    "firstname" VARCHAR(50),
    "lastname" VARCHAR(50),
    "fullname" VARCHAR(50),
    "avatar_url" VARCHAR(500),
    "username" VARCHAR(50),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "oauth2_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_devices_deviceId_key" ON "public"."user_devices"("deviceId");

-- CreateIndex
CREATE INDEX "user_devices_user_id_idx" ON "public"."user_devices"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_devices_device_name_user_id_key" ON "public"."user_devices"("device_name", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_userId_userDeviceId_key" ON "public"."sessions"("userId", "userDeviceId");

-- CreateIndex
CREATE INDEX "codes_user_id_idx" ON "public"."codes"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "codes_code_user_id_key" ON "public"."codes"("code", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "public"."users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE INDEX "users_username_idx" ON "public"."users"("username");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "public"."users"("email");

-- CreateIndex
CREATE INDEX "users_created_at_idx" ON "public"."users"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "oauth2_user_email_key" ON "public"."oauth2_user"("email");

-- AddForeignKey
ALTER TABLE "public"."user_devices" ADD CONSTRAINT "user_devices_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."codes" ADD CONSTRAINT "codes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."oauth2_user" ADD CONSTRAINT "oauth2_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
