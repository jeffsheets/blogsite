---
title: "FROM Excel TO SQL: Claude Code Magic"
description: 'The Excel to SQL converter you didn''t know you needed'
date: '2025-09-30T10:00:00.000-05:00'
tags:
- SQL
- Claude Code
- AI
---

> The Excel to SQL converter you didn't know you needed

So I've been using [Claude Code](https://claude.com/product/claude-code) for SQL generation lately and it's honestly magical.

My 🤯 moment: I can copy/paste a bunch of Excel rows directly into the terminal - item numbers, descriptions, whatever - and Claude Code just **gets it**. Even a screenshot works.

Like, I'll paste in something messy where there are bold category headers above groups of items, and Claude Code infers the relationships. It'll generate proper SQL INSERT statements complete with:

- UUID generation for primary keys
- `createdAt` and `updatedAt` timestamps
- Parent/child relationships from context

I can even say things like "use parentNumber 150 for all rows" and it'll write the subquery to grab the right `parentId` from the Parent table.

```sql
INSERT INTO items (id, itemNumber, description, categoryId, parentId, createdAt, updatedAt)
SELECT
  gen_random_uuid(),
  '12345',
  'Widget Description',
  (SELECT id FROM categories WHERE name = 'Hardware'),
  (SELECT id FROM parents WHERE parentNumber = 150),
  NOW(),
  NOW();
```

The fact that it can parse unstructured Excel data and turn it into structured SQL with proper foreign key relationships? This is *the kind of AI assistance that actually saves real time!!*

[Posted about this on Mastodon too](https://hachyderm.io/@jeffsheets/115290946618395664) because, social media, i guess.

Claude Code is my new fave.
