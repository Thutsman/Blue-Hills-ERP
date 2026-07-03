# FINANCE_AND_NIGHT_AUDIT_SPECIFICATION.md

# Blue Hills Camp Hospitality ERP
## Finance & Night Audit Module Specification

Version: 1.0

Author: Ramcode Technologies

Status: Design Specification

---

# PURPOSE

The Finance & Night Audit module is the financial control centre of the Blue Hills Camp Hospitality ERP.

It consolidates revenue from every operational department and provides management with accurate daily financial reporting.

Unlike traditional accounting software, this module focuses on hospitality operations and daily business closure rather than general bookkeeping.

This module must support complete offline operation.

---

# BUSINESS OBJECTIVES

• Consolidate revenue from all departments

• Maintain guest financial accounts

• Record all payments

• Generate daily cash summaries

• Produce management reports

• Verify departmental revenue

• Perform Night Audit

• Close Business Day

• Maintain a complete financial audit trail

---

# MODULE RESPONSIBILITIES

Finance is responsible for:

Accommodation Revenue

Restaurant Revenue

Bar Revenue

Activities Revenue

Conference Revenue

Guest Charges

Guest Payments

Outstanding Balances

Cash Management

Daily Revenue Reports

Night Audit

Business Day Closure

Financial Dashboard

---

# REVENUE SOURCES

Revenue originates from multiple departments.

Accommodation

↓

Restaurant

↓

Bar

↓

Outdoor Activities

↓

Conference Facilities

↓

Laundry (Future)

↓

Equipment Hire (Future)

↓

Other Charges

All revenue must automatically flow into Finance.

No manual recapturing should be required.

---

# FINANCE DASHBOARD

Purpose

Provide management with a real-time overview of financial performance.

KPI Cards

Today's Revenue

Cash Received

Card Payments

Bank Transfers

Outstanding Balances

Expected Revenue

Today's Check-outs

Average Daily Rate

Occupancy Revenue

Restaurant Revenue

Activities Revenue

Conference Revenue

Expenses

Cash Variance

Charts

Revenue Trend

Department Revenue

Payment Methods

Occupancy vs Revenue

Recent Transactions

Quick Actions

Receive Payment

Create Invoice

Cash Summary

Guest Ledger

Night Audit

Close Business Day

Export Reports

---

# GUEST LEDGER

Every guest has a running financial account.

Purpose

Track every charge posted to the guest.

Sources

Accommodation

Restaurant

Bar

Activities

Conference

Laundry

Manual Charges

Payments

Refunds

Example

Accommodation       $180

Restaurant            $45

Quad Bike             $30

Mini Golf              $5

--------------------------------

Total               $260

Paid                $200

Outstanding          $60

Guest ledger updates automatically whenever charges are posted.

---

# PAYMENT MANAGEMENT

Supported Payment Methods

Cash

Visa

MasterCard

Bank Transfer

EcoCash

USD

ZAR

Future

Mobile Money

Split Payments

Multiple Payments

Deposits

Corporate Credit

Payment Fields

Receipt Number

Guest

Invoice

Amount

Currency

Payment Method

Received By

Date

Time

Reference Number

Status

---

# CASH REGISTER

Each revenue department may operate an independent cash register.

Reception

Restaurant

Bar

Conference

Fields

Opening Float

Cash Received

Cash Paid Out

Refunds

Expected Cash

Actual Cash

Variance

Approved By

Business Date

Purpose

Support accurate cash reconciliation.

---

# DEPARTMENT REVENUE

Revenue should be grouped by operational department.

Accommodation

Restaurant

Bar

Activities

Conference

Other Income

Management can compare departmental performance.

---

# EXPENSE CAPTURE

Daily operating expenses should also be recorded.

Examples

Fuel

Transport

Procurement

Repairs

Cleaning Materials

Consumables

Utilities

Each expense records

Category

Amount

Department

Supplier

Approved By

Reference

Receipt Attachment

---

# DAILY CASH SUMMARY

Purpose

Provide a complete financial summary for the current business day.

Example

Accommodation Revenue

Restaurant Revenue

Bar Revenue

Activities Revenue

Conference Revenue

Total Revenue

Expenses

Net Revenue

Cash

Card

Transfer

Outstanding

Cash Variance

Manager Approval

Generated automatically.

Printable.

PDF Export.

---

# NIGHT AUDIT

Purpose

Verify that every operational department has correctly completed the business day.

Night Audit should guide users through a structured wizard.

It should never be a single overwhelming page.

---

# NIGHT AUDIT WORKFLOW

Step 1

Verify Arrivals

Confirm all expected arrivals.

Identify No Shows.

Confirm room allocations.

Step 2

Verify Check-outs

Ensure every departing guest has been checked out.

Identify overdue departures.

Step 3

Verify Guest Charges

Accommodation

Restaurant

Bar

Activities

Conference

Ensure all charges have been posted.

Step 4

Verify Payments

Cash

Card

Transfers

Deposits

Outstanding balances

Step 5

Verify Restaurant

Confirm all restaurant bills closed.

No open tables.

No unpaid orders.

Step 6

Verify Activities

Confirm completed activities.

Verify equipment returned.

Verify activity charges posted.

Step 7

Cash Reconciliation

Reception

Restaurant

Bar

Compare expected cash against actual cash.

Record variances.

Manager approval required.

Step 8

Inventory Verification

Optional

Ensure major stock movements posted.

Step 9

Generate Reports

Daily Revenue

Cash Summary

Guest Ledger

Outstanding Accounts

Department Revenue

Occupancy Report

Manager Report

Night Audit Report

Step 10

Close Business Day

Lock transactions.

Archive business date.

Open next business day.

---

# BUSINESS DAY

Blue Hills operates using Business Dates.

Business Date

is NOT necessarily equal to

Calendar Date.

Night Audit closes one Business Date before opening the next.

This concept is fundamental to the ERP.

---

# CLOSE BUSINESS DAY

Only authorised users may perform this action.

Process

Verify all departments

↓

Resolve outstanding issues

↓

Generate reports

↓

Lock current business date

↓

Create new business date

↓

Reset daily counters

↓

Archive audit

↓

Business ready for tomorrow

---

# REPORTS

Daily Revenue

Daily Cash Summary

Guest Ledger

Outstanding Accounts

Payment Report

Department Revenue

Activities Revenue

Restaurant Revenue

Accommodation Revenue

Conference Revenue

Expense Report

Cash Variance

Night Audit Report

Manager Summary

Executive Dashboard

Occupancy Revenue

---

# PERMISSIONS

Reception

Receive Payments

View Guest Ledger

Restaurant Manager

Restaurant Revenue

Cash Register

Finance

Everything

Manager

Approve Variances

Close Business Day

Administrator

System Configuration

---

# BUSINESS RULES

Every payment must belong to a Guest or Invoice.

Guest Ledger updates automatically.

Outstanding balances are calculated automatically.

Night Audit cannot start if there are open restaurant tables.

Night Audit cannot complete if guest folios remain open.

Business Day cannot close while cash variances remain unresolved unless approved by management.

Only Managers or Finance Officers may close Business Day.

Business Day can only be closed once.

Every financial transaction requires an audit trail.

Deleted financial transactions are prohibited.

Corrections must use reversal transactions.

---

# PRINTABLE DOCUMENTS

Guest Invoice

Guest Receipt

Payment Receipt

Cash Summary

Revenue Report

Outstanding Accounts

Night Audit Report

Department Revenue

Finance Summary

Manager Summary

---

# FUTURE ENHANCEMENTS

Accounting Integration

QuickBooks

Sage

Pastel

Xero

Bank Reconciliation

Budget Management

Payroll

Fixed Assets

VAT Reporting

Multi-Currency

Mobile Manager Dashboard

Cloud Backup

Email Financial Reports

AI Revenue Forecasting

---

# CLAUDE CODE IMPLEMENTATION NOTES

The Finance module should not resemble traditional accounting software.

It should resemble the Finance modules found in hospitality systems such as Oracle Opera PMS and Cloudbeds.

The primary users are Reception, Finance, Managers and Directors.

The UI should prioritise:

• Large KPI cards

• Guest Ledger

• Daily Revenue

• Department Revenue

• Night Audit Wizard

• Cash Summary

• Outstanding Balances

The Night Audit Wizard should become one of the flagship features of the Blue Hills Camp Hospitality ERP.
