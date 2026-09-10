CREATE TABLE "developments" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"location" varchar(255) NOT NULL,
	"type" varchar(128) NOT NULL,
	"status" varchar(64) DEFAULT 'In Development' NOT NULL,
	"model_url" text,
	"vision_title" varchar(255),
	"vision_text" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "inquiries" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(64),
	"property_id" varchar(128),
	"message" text,
	"status" varchar(32) DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "journal_articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"category" varchar(64) NOT NULL,
	"year" varchar(16) NOT NULL,
	"excerpt" text NOT NULL,
	"content" text,
	"image_url" text,
	"size" varchar(16) DEFAULT 'small' NOT NULL,
	"is_published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "journal_articles_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "properties" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"category" varchar(64) NOT NULL,
	"location" varchar(255) NOT NULL,
	"price" varchar(64) NOT NULL,
	"area" varchar(64) NOT NULL,
	"description" text NOT NULL,
	"beds" integer DEFAULT 0 NOT NULL,
	"baths" integer DEFAULT 0 NOT NULL,
	"levels" integer DEFAULT 1 NOT NULL,
	"image_url" text,
	"is_featured" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
