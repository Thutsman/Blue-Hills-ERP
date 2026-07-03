# CONFERENCE_BOOKING.md

# Blue Hills Camp Hospitality ERP
## Conference & Events Management Module

Version: 1.0

Author: Ramcode Technologies

Status: Functional Specification

---

# PURPOSE

The Conference & Events Management module manages the complete lifecycle of conferences, workshops, corporate retreats, church camps, school camps, weddings and group bookings.

Unlike a standard hotel reservation, a conference booking affects almost every operational department at Blue Hills Camp.

This module coordinates all departments from the initial enquiry through planning, budgeting, procurement, accommodation, catering, activities, finance and post-event reporting.

---

# BUSINESS OBJECTIVES

• Increase conference profitability

• Reduce planning errors

• Eliminate manual Excel planning

• Automate procurement

• Improve departmental coordination

• Track budgets versus actual costs

• Improve customer experience

• Provide management visibility

• Centralise all conference information

---

# EVENT TYPES

Corporate Conference

Government Workshop

NGO Training

Church Conference

School Camp

Sports Camp

Wedding

Birthday Event

Private Function

Team Building

Leadership Training

Custom Event

---

# CURRENT BUSINESS PROCESS

Current process (manual)

Client Enquiry

↓

Quotation prepared in Excel

↓

Client confirms booking

↓

Conference planning workbook created

↓

Estimate accommodation

↓

Estimate meals

↓

Estimate conference requirements

↓

Estimate activities

↓

Prepare procurement list

↓

Purchase supplies

↓

Conference delivered

↓

Finance prepares invoice

↓

Reports produced manually

The World Vision planning workbook is currently the central planning tool.

---

# FUTURE ERP WORKFLOW

Client Enquiry

↓

Conference Quotation

↓

Booking Confirmed

↓

Deposit Received

↓

Conference Project Created

↓

Accommodation Planning

↓

Meal Planning

↓

Activity Planning

↓

Budget Generated

↓

Procurement Requests

↓

Goods Received

↓

Conference Delivered

↓

Final Invoice

↓

Final Payment

↓

Management Report

---

# CONFERENCE DASHBOARD

Purpose

Provide a single operational view of every conference.

Display

Conference Name

Client

Status

Arrival Date

Departure Date

Duration

Number of Guests

Rooms Allocated

Meals Planned

Activities

Budget

Projected Revenue

Projected Cost

Expected Profit

Outstanding Tasks

Deposit Status

Outstanding Balance

Progress Indicator

---

# CONFERENCE INFORMATION

Fields

Conference Number

Conference Name

Client

Organisation

Contact Person

Telephone

Email

Arrival Date

Departure Date

Number of Guests

Number of Rooms

Conference Hall

Meal Package

Activity Package

Special Requirements

Status

---

# CLIENT MANAGEMENT

Store

Organisation

Contact Person

Phone

Email

Billing Address

Tax Number

Previous Conferences

Outstanding Balance

Notes

---

# CONFERENCE STATUS

Enquiry

Quotation

Pending Approval

Confirmed

Deposit Received

Planning

Procurement

Ready

In Progress

Completed

Cancelled

---

# QUOTATION

Conference quotation should include

Accommodation

Conference Hall

Breakfast

Lunch

Dinner

Tea Breaks

Activities

Transport

Equipment Hire

Other Services

Totals

VAT

Deposit Required

Expiry Date

---

# BUDGET PLANNING

Purpose

Estimate conference profitability before confirmation.

Budget Sections

Accommodation

Food

Beverages

Activities

Transport

Procurement

Staff

Cleaning

Utilities

Miscellaneous

Automatically calculate

Projected Revenue

Projected Cost

Projected Gross Profit

Projected Margin

Managers should be able to compare budget against actual values after the event.

---

# MEAL PLANNING

The ERP should generate a catering plan based on:

Number of Guests

Number of Days

Meal Package

Menu Selection

Example

Breakfast

Lunch

Dinner

Tea Break AM

Tea Break PM

Special Diets

Vegetarian

Vegan

Halal

Gluten Free

Kitchen automatically receives production schedules.

---

# PROCUREMENT PLANNING

One of the most important features.

The system should automatically generate procurement requirements from the conference plan.

Example

Conference

↓

27 Guests

↓

2 Nights

↓

Breakfast

↓

Lunch

↓

Dinner

↓

System calculates

Chicken

Beef

Rice

Cooking Oil

Tea

Coffee

Milk

Bread

Vegetables

Cleaning Materials

Stationery

Gas

These items become Purchase Requests.

Managers approve.

Purchase Orders generated automatically.

---

# ACCOMMODATION PLANNING

Allocate

Rooms

Guests

VIP Rooms

Group Rooms

Special Requests

Display occupancy impact on the Front Office Density Chart.

---

# ACTIVITY PLANNING

Conference attendees may book:

Quad Bikes

Paintball

Zipline

Mountain Bikes

Mini Golf

Archery

Swimming

Obstacle Course

For each activity record

Time

Instructor

Equipment

Capacity

Payment Status

Safety Checklist

---

# HOUSEKEEPING

Automatically notify Housekeeping.

Generate

Cleaning Schedule

Arrival Preparation

Departure Cleaning

Laundry Requirements

Special Requests

---

# MAINTENANCE

Conference venues should be inspected before arrival.

Check

Conference Hall

Projector

Sound System

Lighting

Furniture

Power Supply

Internet (if available)

Air Conditioning

Any defects become Maintenance Requests.

---

# FINANCE

Generate

Deposit Invoice

Progress Payments

Final Invoice

Guest Charges

Department Revenue

Outstanding Balance

Conference Profit

Actual vs Budget

---

# TASK MANAGEMENT

Conference planning should include departmental tasks.

Examples

Reception

Confirm reservations

Kitchen

Prepare menu

Stores

Receive stock

Procurement

Purchase supplies

Housekeeping

Prepare rooms

Maintenance

Inspect conference hall

Finance

Prepare invoices

Every task records

Owner

Due Date

Status

Priority

Completion Date

---

# REPORTS

Conference Summary

Guest List

Accommodation List

Room Allocation

Meal Schedule

Activity Schedule

Procurement List

Purchase Orders

Budget vs Actual

Revenue Report

Profit Report

Department Contribution

Outstanding Balance

Attendance Report

Post Event Report

---

# BUSINESS RULES

A conference cannot be confirmed without an approved quotation.

A conference cannot begin without room allocation.

Budget approval is required before procurement.

Procurement requests are generated from the conference budget.

Purchase Orders originate from approved requests.

Deposits must be recorded before the conference is marked as Confirmed (unless overridden by management).

All conference charges post automatically to Finance.

Conference profitability is calculated automatically.

Conference completion automatically archives the project.

---

# USER ROLES

Sales & Marketing

Create enquiries

Prepare quotations

Reception

Manage accommodation

Conference Coordinator

Manage planning

Kitchen

Meal planning

Procurement

Purchase goods

Stores

Receive goods

Housekeeping

Prepare rooms

Maintenance

Venue preparation

Finance

Invoices

Payments

Management

Approve budgets

Approve procurement

Review profitability

---

# SCREENS

Conference Dashboard

Conference Calendar

Conference Details

Client Profile

Quotation Builder

Budget Planner

Accommodation Planner

Meal Planner

Procurement Planner

Activity Planner

Task Board

Finance Summary

Reports

---

# FUTURE ENHANCEMENTS

Online conference enquiries

Electronic quotation approval

Digital contracts

Digital signatures

SMS reminders

WhatsApp notifications

Email invitations

QR code attendee registration

Name badge printing

Attendance tracking

Microsoft Teams integration

Google Calendar integration

Conference mobile app

AI demand forecasting

AI menu cost optimisation

Conference profitability forecasting

Multi-venue support

Multi-property support

---

# CLAUDE CODE IMPLEMENTATION NOTES

Treat every conference as a **project**, not simply a reservation.

A conference is a cross-department workflow involving:

Sales

↓

Reception

↓

Accommodation

↓

Kitchen

↓

Restaurant

↓

Activities

↓

Housekeeping

↓

Maintenance

↓

Procurement

↓

Stores

↓

Finance

↓

Management

The Conference Dashboard should become one of the flagship screens of the Blue Hills Camp Hospitality ERP.

Managers should be able to monitor conference readiness from a single screen, including accommodation, catering, procurement, activities, financial status and departmental progress.

This module should feel closer to a lightweight project management system than a traditional hotel booking screen.

---

# IMPLEMENTATION STATUS (this codebase)

Note: several items in "Future Enhancements" above (SMS, WhatsApp, Teams/Google Calendar sync, online enquiries, AI forecasting) contradict this project's non-negotiable offline-first / no-cloud-services requirement (see `project_context.md.txt`) and are intentionally **out of scope** for this implementation. Everything else in this spec was implemented — see `CLAUDE.md` for where the Conference module lives in `src/App.tsx` and how it ties into Front Office, Restaurant/Kitchen, Activities, Procurement and Finance.
