import {
  mysqlTable,
  int,
  varchar,
  timestamp,
  mysqlEnum,
  date,
  time,
  text,
  boolean,
  primaryKey,
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { AdapterAccountType } from 'next-auth/adapters';

export const contacts = mysqlTable('contacts', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  company: varchar('company', { length: 255 }),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 20 }).notNull(),
  status: mysqlEnum('status', ['New', 'In Progress', 'Closed']).default('New'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export const calls = mysqlTable('calls', {
  id: int('id').primaryKey().autoincrement(),
  contactId: int('contact_id'),
  date: date('date').notNull(),
  time: time('time').notNull(),
  duration: int('duration'),
  outcome: mysqlEnum('outcome', ['Successful', 'No Answer', 'Left Voicemail']),
  notes: text('notes'),
});

export const followUps = mysqlTable('follow_ups', {
  id: int('id').primaryKey().autoincrement(),
  contactId: int('contact_id'),
  date: date('date').notNull(),
  status: mysqlEnum('status', ['Pending', 'Completed', 'Rescheduled']).default(
    'Pending'
  ),
  notes: text('notes'),
});

export const contactsRelations = relations(contacts, ({ many }) => ({
  calls: many(calls),
  followUps: many(followUps),
}));

export const callsRelations = relations(calls, ({ one }) => ({
  contact: one(contacts, {
    fields: [calls.contactId],
    references: [contacts.id],
  }),
}));

export const followUpsRelations = relations(followUps, ({ one }) => ({
  contact: one(contacts, {
    fields: [followUps.contactId],
    references: [contacts.id],
  }),
}));

// next auth stuff

export const users = mysqlTable('user', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).unique(),
  emailVerified: timestamp('emailVerified', {
    mode: 'date',
    fsp: 3,
  }),
  image: varchar('image', { length: 255 }),
});

export const accounts = mysqlTable(
  'account',
  {
    userId: varchar('userId', { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: varchar('type', { length: 255 })
      .$type<AdapterAccountType>()
      .notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
    refresh_token: varchar('refresh_token', { length: 255 }),
    access_token: varchar('access_token', { length: 255 }),
    expires_at: int('expires_at'),
    token_type: varchar('token_type', { length: 255 }),
    scope: varchar('scope', { length: 255 }),
    id_token: varchar('id_token', { length: 2048 }),
    session_state: varchar('session_state', { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = mysqlTable('session', {
  sessionToken: varchar('sessionToken', { length: 255 }).primaryKey(),
  userId: varchar('userId', { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = mysqlTable(
  'verificationToken',
  {
    identifier: varchar('identifier', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);

export const authenticators = mysqlTable(
  'authenticator',
  {
    credentialID: varchar('credentialID', { length: 255 }).notNull().unique(),
    userId: varchar('userId', { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
    credentialPublicKey: varchar('credentialPublicKey', {
      length: 255,
    }).notNull(),
    counter: int('counter').notNull(),
    credentialDeviceType: varchar('credentialDeviceType', {
      length: 255,
    }).notNull(),
    credentialBackedUp: boolean('credentialBackedUp').notNull(),
    transports: varchar('transports', { length: 255 }),
  },
  (authenticator) => ({
    compositePk: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
);
