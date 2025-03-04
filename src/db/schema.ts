import { pgTable, serial, text, pgEnum, timestamp, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

//Define role types
export const roleEnum = pgEnum("role", ["ADMIN", "TEACHER", "STUDENT"]);

//Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  role: roleEnum("role").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Student Profiles (Managed by Teachers)
export const studentProfiles = pgTable("student_profiles", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").references(() => users.id).notNull(),
  assignedTeacherId: integer("teacher_id").references(() => users.id).notNull(),
  bio: text("bio").notNull(),
  skills: text("skills").notNull(),
  progress: text("progress").default("NS"), // Progress tracking
  createdAt: timestamp("created_at").defaultNow(),
});

// Tasks assigned to students by teachers
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  tech: text('tech'),
  status: text("status").default("NS"),
  deadline: timestamp("deadline").notNull(),
  studentId: integer("student_id").references(() => users.id).notNull(),
  teacherId: integer("teacher_id").references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});