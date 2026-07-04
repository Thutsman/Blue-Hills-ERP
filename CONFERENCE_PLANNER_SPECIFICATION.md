# CONFERENCE_PLANNER_SPECIFICATION.md

# Blue Hills Camp Hospitality ERP
## Conference Planner Specification

Version: 1.0

Author: Ramcode Technologies

Purpose:
Provide a central command centre for planning, coordinating and monitoring conferences and large group bookings across every operational department.

---

# DESIGN PHILOSOPHY

A Conference is NOT a reservation.

A Conference is NOT a meeting room booking.

A Conference is a PROJECT.

The Conference Planner is the project management module for Blue Hills Camp.

It coordinates:

• Sales
• Reception
• Accommodation
• Kitchen
• Restaurant
• Procurement
• Stores
• Activities
• Housekeeping
• Maintenance
• Finance
• Management

Every department works from one Conference Planner.

---

# BUSINESS OBJECTIVES

Reduce planning mistakes.

Improve communication.

Improve procurement planning.

Track budgets.

Track departmental readiness.

Track conference profitability.

Provide management visibility.

Replace the World Vision Excel planning workbook.

---

# CONFERENCE DASHBOARD

This is the flagship screen.

Display

Conference Name

Client

Status

Arrival Date

Departure Date

Guests

Rooms

Conference Hall

Coordinator

Deposit

Outstanding Balance

Projected Revenue

Projected Cost

Projected Profit

Overall Readiness

Display progress cards for

Accommodation

Conference Hall

Meals

Activities

Procurement

Housekeeping

Maintenance

Finance

Task Completion

The dashboard should immediately communicate whether the conference is ready.

---

# CONFERENCE TIMELINE

Every conference has milestones.

Example

Enquiry

↓

Quotation

↓

Approval

↓

Deposit

↓

Planning

↓

Procurement

↓

Room Allocation

↓

Kitchen Preparation

↓

Guest Arrival

↓

Conference Running

↓

Checkout

↓

Final Invoice

↓

Post Event Review

Timeline should be visual.

---

# DEPARTMENT READINESS

Every department reports readiness.

Accommodation

Ready %

Housekeeping

Ready %

Kitchen

Ready %

Restaurant

Ready %

Activities

Ready %

Maintenance

Ready %

Procurement

Ready %

Finance

Ready %

Overall readiness calculated automatically.

---

# TASK BOARD

Every department receives tasks.

Example

Reception

Allocate rooms

Prepare registration cards

Print guest list

Kitchen

Prepare menus

Receive ingredients

Assign chefs

Restaurant

Prepare tables

Prepare beverages

Housekeeping

Clean chalets

Prepare conference hall

Laundry

Maintenance

Test generator

Test projector

Check PA system

Activities

Assign instructors

Inspect equipment

Stores

Receive deliveries

Issue ingredients

Finance

Prepare invoices

Verify deposits

Sales

Client communication

Task fields

Department

Assigned User

Priority

Status

Due Date

Completion Date

Notes

Attachments

Statuses

Not Started

In Progress

Waiting

Completed

Blocked

---

# BUDGET PLANNER

Before procurement begins.

Estimate

Accommodation Revenue

Restaurant Revenue

Conference Hall

Activities

Transport

Other Revenue

Estimate Costs

Food

Beverages

Cleaning

Fuel

Staff

Utilities

Activities

Equipment

Transport

Miscellaneous

Automatically calculate

Projected Revenue

Projected Cost

Gross Profit

Profit Margin

Budget Variance

---

# PROCUREMENT PLANNER

Automatically calculate procurement from

Guests

Days

Meal Package

Menu

Conference Type

Generate Purchase Requests

Example

Chicken

Rice

Cooking Oil

Tea

Coffee

Milk

Sugar

Bread

Cleaning Materials

Stationery

Gas

Paper

Ink

Manager approves.

Purchase Orders generated automatically.

---

# ROOM ALLOCATION

Allocate rooms visually.

Show

Room

Guests

VIP Rooms

Group Rooms

Special Requests

Room Status

Available

Occupied

Blocked

Maintenance

Integration

Front Office Density Chart

---

# MEAL PLANNER

Configure

Breakfast

Lunch

Dinner

Tea Breaks

Menus

Special Diets

Kitchen automatically receives production schedule.

---

# ACTIVITY PLANNER

Allocate

Activities

Instructors

Equipment

Time Slots

Maximum Capacity

Safety Checklist

Payment Status

---

# RESOURCE MANAGEMENT

Track

Conference Hall

Projector

Sound System

Microphones

Tables

Chairs

Generators

Vehicles

Sports Equipment

Status

Available

Reserved

Maintenance

---

# DOCUMENT CENTRE

Store

Quotation

Contract

Purchase Orders

Invoices

Guest List

Programme

Menus

Risk Assessment

Receipts

Photos

Meeting Notes

Everything linked to one conference.

---

# COMMUNICATION LOG

Store

Phone Calls

Emails

WhatsApp Notes

Meetings

Site Visits

Follow-ups

Date

User

Summary

Attachments

---

# FINANCIAL SUMMARY

Show

Deposit

Payments

Outstanding Balance

Projected Revenue

Actual Revenue

Projected Costs

Actual Costs

Gross Profit

Net Profit

Department Contribution

Budget Variance

---

# POST EVENT REVIEW

Capture

Attendance

Customer Feedback

Incidents

Lessons Learned

Revenue

Profit

Recommendations

Rating

Management Comments

---

# REPORTS

Conference Dashboard

Conference Budget

Procurement

Task Progress

Department Readiness

Accommodation Allocation

Meal Schedule

Activity Schedule

Guest List

Room List

Conference Profitability

Budget vs Actual

Outstanding Balance

Management Summary

---

# BUSINESS RULES

Conference cannot begin without rooms allocated.

Conference cannot begin without kitchen readiness.

Conference cannot begin without procurement completion.

Conference cannot move to Ready until every critical department reaches 100%.

Budget approval required before procurement.

Purchase Orders originate from conference procurement.

Conference profitability calculated automatically.

Every department reports readiness.

Task completion updates readiness.

Conference closes only after Finance approval.

---

# FUTURE FEATURES

Conference Mobile App

Client Portal

Digital Signatures

Online Quotations

QR Attendance

Badge Printing

WhatsApp Notifications

AI Budget Forecasting

AI Food Forecasting

AI Procurement Optimisation

Multi-property Conference Planning

---

# IMPLEMENTATION STATUS (this codebase)

Implemented inside the existing `ConferenceDetailDrawer` (a wide-variant Drawer with internal tabs) rather than as a new page-navigation pattern, per this project's "reuse the existing layout, do not redesign the application" constraint - see `CLAUDE.md` for exactly where each tab lives in `src/App.tsx`.

Department Readiness is **computed live** from existing signals (room allocation ratio, procurement request status, per-department task completion) rather than stored as a separate field - consistent with this codebase's "alerts must be computed live from state" convention.

"Future Features" requiring internet connectivity (mobile app, client portal, digital signatures, online quotations, QR attendance, WhatsApp/SMS notifications, AI forecasting) are intentionally out of scope, matching the project's non-negotiable offline-first requirement.
