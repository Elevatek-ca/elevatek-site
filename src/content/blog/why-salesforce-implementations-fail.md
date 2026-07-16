---
title: "Why do Salesforce implementations fail?"
description: "Salesforce implementations fail on alignment and adoption, not technology. The patterns behind the 70% number, and how to catch a project going sideways."
pubDate: 2026-07-16
lang: "en"
draft: false
tags: ["salesforce", "implementation", "adoption", "revops"]
---

Salesforce implementations fail on alignment and adoption, not technology. The platform works. What breaks is everything around it: who owns the process, whether anyone trusts the data, and whether your reps have a reason to live in the system.

You've seen the number. 70% of implementations fail. Nobody can source it cleanly. It gets passed around vendor blogs like folklore. But after ten years inside these projects, I can tell you the pattern behind the number is real. And it's almost never the software.

Here are the four ways I see it happen.

## The build started before the business agreed

The kickoff jumps straight to fields and flows. Requirements come from whoever showed up to the workshop. Sales and finance never agreed on what a closed deal actually means, so the system encodes the disagreement.

Then someone automates it.

Automation on top of an unsettled process doesn't fix anything. It makes the wrong thing happen faster, at scale, with an audit trail. Six months later you're paying to undo work you paid to build.

The tell: nobody in the project can answer "who decided this?" about a core process. Because nobody did. The config decided.

## Adoption got treated as a training problem

Reps don't avoid the CRM because they can't use it. They avoid it because it costs them time and gives nothing back.

If updating an opportunity takes eight clicks and the only beneficiary is the forecast meeting, your reps will keep their real pipeline in a spreadsheet and paste numbers in on Thursday night. That's not resistance to change. That's a rational response to bad design.

More training doesn't fix this. Training teaches clicks. It can't fix a system that works against the people using it. The fix is designing the CRM so the rep gets something out of every field they fill: better handoffs, less re-typing, a forecast that defends itself.

When the tool serves the user, adoption stops being a program. It's just what people do.

## Nobody owns it after go-live

A Salesforce org outlives the project that built it. The consultants leave. The admin inherits four hundred flows and a data model nobody documented.

Now every change is archaeology. Someone asks why a validation rule exists and the honest answer is that nobody knows, so nobody dares remove it. Nothing gets deleted. Everything gets added. Complexity compounds quarter after quarter until the org is a haunted house: everyone works around the rooms they're afraid of.

This one isn't a technical failure at all. It's an ownership failure that happens to live in a database.

## The data stopped being trusted, so people stopped too

Duplicates. Half-filled records. Two reports on the same quarter that disagree with each other and with finance.

The first time a VP catches the dashboard contradicting the spreadsheet, the dashboard loses. Permanently. From that moment the CRM is a chore you comply with, not a source of truth you consult. Every decision routes back to the spreadsheet, which drifts further from the system, which makes the system less trustworthy. The loop feeds itself.

And every AI feature you bolt on top inherits the mess. A model trained on data nobody trusts produces answers nobody trusts, faster.

## How to catch one going sideways

You don't need a post-mortem to know. The signals show up months early:

→ Status meetings are about features, not process decisions.  
→ Nobody can name who owns lead routing or opportunity stages without checking.  
→ The demo looks great, but pipeline reviews still run off a spreadsheet.  
→ Exports keep multiplying. People pull data out to actually work with it.  
→ Someone says "we'll clean the data after go-live."

One of these is a flag. Two means have the conversation this week. Three means you're already sideways, whatever the status report says.

## What to do if you're seeing this

Not a restart. Almost never a restart.

Start with an honest audit: map the process before touching the config, give the org a named owner, and get sales and finance to sign off on one report they both believe. Boring moves. They compound.

Most "failed" implementations are salvageable, because the expensive part was never the software. It was the decisions nobody made. Make them now, in the right order, and the same org that everyone works around becomes the one they work in.

Here's the part most people get backwards: they blame the platform, or the consultants, or the users. But a CRM can only encode the decisions you feed it. If the implementation failed, the failure predates the software. Which is genuinely good news, because it means you can catch the next one early. You now know exactly what to look for, and most of your competitors don't.

If you want a second set of eyes on yours, the first conversation costs nothing. But the checklist above works whether we ever talk or not.
