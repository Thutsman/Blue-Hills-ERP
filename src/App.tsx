import {
  Activity,
  AlertTriangle,
  Banknote,
  BedDouble,
  Bell,
  CalendarDays,
  ChefHat,
  CheckCircle2,
  ClipboardCheck,
  ClipboardCopy,
  CreditCard,
  DoorOpen,
  FileText,
  Home,
  Hotel,
  KeyRound,
  Landmark,
  LayoutDashboard,
  Lock,
  LogOut,
  Menu,
  Minus,
  Package,
  Plus,
  Printer,
  Receipt,
  RotateCcw,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Trash2,
  TrendingUp,
  Utensils,
  Wallet,
  Warehouse,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";

type ModuleId =
  | "dashboard"
  | "frontOffice"
  | "restaurant"
  | "operations"
  | "procurement"
  | "finance";

type ReservationStatus =
  | "Tentative"
  | "Confirmed"
  | "Guaranteed"
  | "Checked In"
  | "Checked Out"
  | "Cancelled";

type PaymentMethod = "Cash" | "Ecocash" | "Bank Transfer" | "Card";

type PaymentStatus = "Paid" | "Deposit Paid" | "Outstanding";
type Lodge = "Zebra" | "Kudu" | "Impala" | "Dormitory";
type RoomStatus = "Available" | "Occupied" | "Dirty" | "Maintenance" | "Staff";
type KitchenStatus = "New" | "Preparing" | "Ready" | "Completed";

type Room = {
  id: string;
  number: string;
  lodge: Lodge;
  type: string;
  status: RoomStatus;
};

type LinenType = "Single bed sets" | "Double bed sets" | "Small white T/cloths" | "Towels";

type LinenCount = {
  type: LinenType;
  clean: number;
  dirty: number;
  parStock: number;
};

type ChemicalUnit = "ltrs" | "kg" | "units";

type ChemicalStockItem = {
  name: string;
  quantity: number;
  unit: ChemicalUnit;
  reorderLevel: number;
};

type AmenityStockItem = {
  name: string;
  quantity: number;
  reorderLevel: number;
};

type RoomStatusSnapshot = {
  room: string;
  lodge: Lodge;
  status: RoomStatus;
  notes?: string;
};

type HousekeepingChecklist = {
  id: string;
  date: string;
  submittedBy: string;
  submittedAt: string;
  linen: LinenCount[];
  chemicals: ChemicalStockItem[];
  amenities: AmenityStockItem[];
  roomStatuses: RoomStatusSnapshot[];
  notes?: string;
};

type HousekeepingChecklistFormValues = {
  date: string;
  submittedBy: string;
  linen: LinenCount[];
  chemicals: ChemicalStockItem[];
  amenities: AmenityStockItem[];
  roomStatuses: RoomStatusSnapshot[];
  notes?: string;
};

type StockAlert = {
  kind: "chemical" | "amenity" | "linen";
  item: string;
  message: string;
  severity: "warning" | "danger";
};

type Reservation = {
  id: string;
  guest: string;
  organisation: string;
  phone?: string;
  email?: string;
  room: string;
  arrival: string;
  departure: string;
  guests: number;
  status: ReservationStatus;
  payment: PaymentStatus;
  balance: number;
  purpose: "Accommodation" | "Conference Group" | "Activities";
  rate?: number;
  notes?: string;
  idNumber?: string;
  vehicle?: string;
};

type ReservationFormValues = {
  guest: string;
  organisation: string;
  phone: string;
  email: string;
  room: string;
  arrival: string;
  departure: string;
  guests: number;
  purpose: Reservation["purpose"];
  rate: number;
  depositAmount: number;
  paymentMethod: PaymentMethod;
  notes: string;
};

type HousekeepingTask = {
  id: string;
  room: string;
  assignedTo: string;
  status: "Queued" | "Cleaning" | "Inspection" | "Available";
  priority: "Normal" | "High";
};

type MenuCategory = "Food" | "Beverage" | "Alcohol";

type MenuCatalogItem = {
  name: string;
  price: number;
  category: MenuCategory;
};

type OrderLineItem = {
  name: string;
  price: number;
  quantity: number;
};

type PosOrder = {
  id: string;
  table: string;
  waiter: string;
  guest: string;
  items: OrderLineItem[];
  total: number;
  payment: "Cash" | "Card" | "Room Charge";
  kitchenStatus: KitchenStatus;
  containsAlcohol: boolean;
  ageVerified: boolean;
  placedAt: string;
  settledAt?: string;
};

type PosOrderFormValues = {
  table: string;
  guest: string;
  waiter: string;
  payment: PosOrder["payment"];
  items: OrderLineItem[];
  ageVerified: boolean;
};

type TaskCheckStatus = "Done" | "Pending";

type KitchenChecklistItem = {
  section: string;
  label: string;
  status: TaskCheckStatus;
};

type KitchenClosingChecklist = {
  id: string;
  date: string;
  submittedBy: string;
  submittedAt: string;
  fridgeTempC: number;
  items: KitchenChecklistItem[];
  notes?: string;
};

type KitchenChecklistFormValues = {
  date: string;
  submittedBy: string;
  fridgeTempC: number;
  items: KitchenChecklistItem[];
  notes: string;
};

type KitchenChecklistAlert = {
  section: string;
  item: string;
  checklistDate: string;
};

type StockCategory =
  | "Food"
  | "Beverages"
  | "Cleaning Materials"
  | "Office Supplies"
  | "Maintenance Materials"
  | "Activity Equipment"
  | "Kitchen Equipment"
  | "Bar Stock"
  | "Uniforms"
  | "Stationery";

type SupplierStatus = "Active" | "Inactive";

type Supplier = {
  id: string;
  name: string;
  category: string;
  contactPerson: string;
  phone: string;
  email?: string;
  address?: string;
  taxNumber?: string;
  preferred: boolean;
  paymentTerms: string;
  status: SupplierStatus;
};

type SupplierFormValues = {
  name: string;
  category: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  taxNumber: string;
  preferred: boolean;
  paymentTerms: string;
};

type InventoryItemStatus = "Active" | "Discontinued";

type InventoryItem = {
  id: string;
  name: string;
  category: StockCategory;
  unit: string;
  supplierId: string;
  reorderLevel: number;
  minStock: number;
  maxStock: number;
  currentQuantity: number;
  averageCost: number;
  status: InventoryItemStatus;
};

type InventoryItemFormValues = {
  name: string;
  category: StockCategory;
  unit: string;
  supplierId: string;
  reorderLevel: number;
  minStock: number;
  maxStock: number;
  currentQuantity: number;
  averageCost: number;
};

type RequestPriority = "Low" | "Normal" | "High" | "Urgent";

type PurchaseRequestStatus = "Draft" | "Pending Approval" | "Approved" | "Rejected" | "Converted to PO";

type PurchaseLineItem = {
  itemId?: string;
  description: string;
  quantity: number;
  estimatedCost: number;
};

type PurchaseRequest = {
  id: string;
  department: string;
  requestedBy: string;
  requestDate: string;
  priority: RequestPriority;
  requiredDate: string;
  reason: string;
  items: PurchaseLineItem[];
  estimatedTotal: number;
  status: PurchaseRequestStatus;
};

type PurchaseRequestFormValues = {
  department: string;
  requestedBy: string;
  priority: RequestPriority;
  requiredDate: string;
  reason: string;
  items: PurchaseLineItem[];
};

type PoStatus = "Issued" | "Goods Received" | "Cancelled";

type GoodsReceivedCondition = "Good" | "Damaged" | "Partial";

type PurchaseOrderLineItem = {
  itemId?: string;
  description: string;
  quantityOrdered: number;
  quantityReceived: number;
  unitPrice: number;
  condition?: GoodsReceivedCondition;
};

type PurchaseOrder = {
  id: string;
  requestId: string;
  supplierId: string;
  department: string;
  issueDate: string;
  deliveryDate: string;
  requestedBy: string;
  approvedBy: string;
  items: PurchaseOrderLineItem[];
  total: number;
  status: PoStatus;
  notes?: string;
  receivedBy?: string;
  receivedDate?: string;
  receivingComments?: string;
};

type PurchaseOrderFormValues = {
  supplierId: string;
  deliveryDate: string;
  approvedBy: string;
  items: Array<{ itemId?: string; description: string; quantity: number; unitPrice: number }>;
  notes: string;
};

type GoodsReceivedFormValues = {
  receivedBy: string;
  comments: string;
  items: Array<{ itemId?: string; description: string; quantityOrdered: number; quantityReceived: number; condition: GoodsReceivedCondition }>;
};

type LowStockAlert = {
  itemId: string;
  name: string;
  currentQuantity: number;
  reorderLevel: number;
  unit: string;
  severity: "warning" | "danger";
};

const INVENTORY_LOCATIONS = [
  "Main Stores",
  "Kitchen",
  "Restaurant",
  "Bar",
  "Housekeeping",
  "Maintenance",
  "Outdoor Activities",
  "Reception",
  "Conference Stores",
] as const;

type InventoryLocation = (typeof INVENTORY_LOCATIONS)[number];

type MovementType = "Issue" | "Transfer" | "Adjustment";

type MovementStatus = "Pending Approval" | "Completed" | "Rejected";

type AdjustmentReason = "Damage" | "Loss" | "Expiry" | "Theft" | "Counting Error" | "Manual Correction";

type StockMovement = {
  id: string;
  type: MovementType;
  itemId: string;
  itemName: string;
  unit: string;
  quantity: number;
  department?: string;
  fromLocation?: InventoryLocation;
  toLocation?: InventoryLocation;
  adjustmentReason?: AdjustmentReason;
  reason: string;
  requestedBy: string;
  date: string;
  status: MovementStatus;
  approvedBy?: string;
};

type StockIssueFormValues = {
  itemId: string;
  quantity: number;
  department: string;
  requestedBy: string;
  reason: string;
};

type StockTransferFormValues = {
  itemId: string;
  quantity: number;
  fromLocation: InventoryLocation;
  toLocation: InventoryLocation;
  requestedBy: string;
  reason: string;
};

type StockAdjustmentFormValues = {
  itemId: string;
  quantity: number;
  adjustmentReason: AdjustmentReason;
  requestedBy: string;
  reason: string;
};

type StockTakeStatus = "Open" | "Approved";

type StockTakeLine = {
  itemId: string;
  itemName: string;
  unit: string;
  expectedQuantity: number;
  countedQuantity: number;
};

type StockTake = {
  id: string;
  date: string;
  countedBy: string;
  items: StockTakeLine[];
  status: StockTakeStatus;
  approvedBy?: string;
  notes?: string;
};

type StockTakeFormValues = {
  countedBy: string;
  items: StockTakeLine[];
  notes: string;
};

type ActivityType = "Zipline" | "Quad Bike" | "Mountaineering" | "Putt Putt" | "Biking";

type ActivityBooking = {
  id: string;
  activity: ActivityType;
  guest: string;
  participants: number;
  date: string;
  time: string;
  instructor: string;
  status: "Booked" | "In Progress" | "Closed";
  price: number;
  payment: "Cash" | "Card" | "Room Charge";
  settledAt?: string;
  ageConfirmed: boolean;
  guardianPresent: boolean;
  weightKg?: number;
  medicalClear: boolean;
  indemnitySigned: boolean;
  notes?: string;
};

type ActivityBookingFormValues = {
  activity: ActivityType;
  guest: string;
  participants: number;
  date: string;
  time: string;
  instructor: string;
  price: number;
  payment: ActivityBooking["payment"];
  ageConfirmed: boolean;
  guardianPresent: boolean;
  weightKg: string;
  medicalClear: boolean;
  indemnitySigned: boolean;
  notes: string;
};

type ChecklistItemStatus = "Pass" | "Fail";

type ActivityChecklistItem = {
  label: string;
  status: ChecklistItemStatus;
};

type WeatherCondition = "Clear" | "Thunder/Lightning" | "Extreme Heat" | "Heavy Rain" | "Unsafe Wind";

type ActivityDailyChecklist = {
  id: string;
  activity: ActivityType;
  date: string;
  submittedBy: string;
  submittedAt: string;
  weather: WeatherCondition;
  items: ActivityChecklistItem[];
  notes?: string;
};

type ActivityChecklistFormValues = {
  activity: ActivityType;
  date: string;
  submittedBy: string;
  weather: WeatherCondition;
  items: ActivityChecklistItem[];
  notes: string;
};

type ActivityEquipmentAlert = {
  activity: ActivityType;
  item: string;
  checklistDate: string;
};

type Enquiry = {
  id: string;
  source: "Telephone" | "WhatsApp" | "Email" | "Walk-in";
  guest: string;
  request: string;
  arrival: string;
  status: "New" | "Quoted" | "Follow-up" | "Confirmed" | "Lost";
  nextStep: string;
};

type ManualTask = {
  id: string;
  area: string;
  item: string;
  owner: string;
  status: "Pending" | "Done" | "Needs Attention";
};

type GuestMessage = {
  id: string;
  guest: string;
  room: string;
  caller: string;
  message: string;
  status: "Held for Arrival" | "Placed in Key Box" | "Delivered";
};

type KeyLog = {
  id: string;
  room: string;
  action: "Issued" | "Returned" | "Spare Key Released" | "Missing Report";
  reason: string;
  staff: string;
};

type Complaint = {
  id: string;
  department: "Restaurant" | "Activities" | "Front Office";
  guest: string;
  issue: string;
  status: "Logged" | "Manager Review" | "Resolved";
};

type IncidentNature =
  | "Abrasions/Scrapes"
  | "Bruising"
  | "Sprain/Strain"
  | "Cut/Laceration"
  | "Broken Bone"
  | "Concussion"
  | "Heat/Sickness"
  | "Other";

type SafetyIncidentReport = {
  id: string;
  activity: ActivityType;
  participantName: string;
  operatorName: string;
  date: string;
  time: string;
  natureOfInjury: IncidentNature;
  firstAidProvided: boolean;
  ambulanceCalled: boolean;
  etdPerformed: boolean;
  causeOfIncident: string;
  actionTaken: string;
  witnessName?: string;
  status: "Logged" | "Manager Review" | "Resolved";
};

type SafetyIncidentFormValues = {
  activity: ActivityType;
  participantName: string;
  operatorName: string;
  date: string;
  time: string;
  natureOfInjury: IncidentNature;
  firstAidProvided: boolean;
  ambulanceCalled: boolean;
  etdPerformed: boolean;
  causeOfIncident: string;
  actionTaken: string;
  witnessName: string;
};

type CashRegisterArea = "Reception" | "Restaurant" | "Bar" | "Conference";

type CashRegister = {
  id: string;
  area: CashRegisterArea;
  businessDate: string;
  openingFloat: number;
  cashPaidOut: number;
  refunds: number;
  actualCash?: number;
  approvedBy?: string;
  countedAt?: string;
  status: "Trading" | "Counted" | "Variance Approved";
};

type ReportRun = {
  id: string;
  report: string;
  schedule: string;
  status: "Ready" | "Printed" | "PDF Saved";
};

type AuditItem = {
  id: string;
  text: string;
  user: string;
  time: string;
};

type ReceiptPurpose = "Deposit" | "Balance Payment" | "Full Settlement";

type Receipt = {
  id: string;
  reservationId: string;
  guest: string;
  amount: number;
  method: PaymentMethod;
  purpose: ReceiptPurpose;
  balanceAfter: number;
  issuedBy: string;
  time: string;
};

type ExpenseCategory =
  | "Fuel"
  | "Transport"
  | "Procurement"
  | "Repairs & Maintenance"
  | "Cleaning Materials"
  | "Consumables"
  | "Utilities"
  | "Other";

type Expense = {
  id: string;
  category: ExpenseCategory;
  department: string;
  amount: number;
  supplier?: string;
  approvedBy: string;
  reference?: string;
  recordedBy: string;
  date: string;
  time: string;
};

type NightAuditStepId = "arrivals" | "checkouts" | "charges" | "restaurant" | "cash" | "reports";

type NightAuditRun = {
  id: string;
  businessDate: string;
  startedAt: string;
  startedBy: string;
  completedSteps: NightAuditStepId[];
  completedAt?: string;
  status: "In Progress" | "Completed";
};

type BusinessDayStatus = "Trading" | "Closed";

type BusinessDayRecord = {
  date: string;
  status: BusinessDayStatus;
  closedAt?: string;
  closedBy?: string;
  nightAuditRunId?: string;
};

type DemoState = {
  rooms: Room[];
  reservations: Reservation[];
  housekeeping: HousekeepingTask[];
  orders: PosOrder[];
  purchaseRequests: PurchaseRequest[];
  purchaseOrders: PurchaseOrder[];
  inventoryItems: InventoryItem[];
  suppliers: Supplier[];
  stockMovements: StockMovement[];
  stockTakes: StockTake[];
  activities: ActivityBooking[];
  enquiries: Enquiry[];
  manualTasks: ManualTask[];
  messages: GuestMessage[];
  keyLogs: KeyLog[];
  complaints: Complaint[];
  safetyIncidents: SafetyIncidentReport[];
  activityChecklists: ActivityDailyChecklist[];
  kitchenChecklists: KitchenClosingChecklist[];
  cashRegisters: CashRegister[];
  reports: ReportRun[];
  receipts: Receipt[];
  expenses: Expense[];
  nightAuditRuns: NightAuditRun[];
  businessDay: BusinessDayRecord;
  audit: AuditItem[];
  housekeepingChecklists: HousekeepingChecklist[];
};

const storageKey = "blue-hills-erp-demo-v7";

const LODGE_ORDER: Lodge[] = ["Zebra", "Kudu", "Impala", "Dormitory"];

const LINEN_TYPES: LinenType[] = ["Single bed sets", "Double bed sets", "Small white T/cloths", "Towels"];

const LINEN_PAR_STOCK: Record<LinenType, number> = {
  "Single bed sets": 50,
  "Double bed sets": 20,
  "Small white T/cloths": 30,
  Towels: 25,
};

const CHEMICAL_CATALOG: Array<{ name: string; unit: ChemicalUnit; reorderLevel: number }> = [
  { name: "Dishwasher", unit: "ltrs", reorderLevel: 10 },
  { name: "Degreaser", unit: "ltrs", reorderLevel: 10 },
  { name: "Multi clean", unit: "ltrs", reorderLevel: 5 },
  { name: "Bluefresh", unit: "ltrs", reorderLevel: 10 },
  { name: "Hand Andy", unit: "ltrs", reorderLevel: 5 },
  { name: "Imperial mint", unit: "ltrs", reorderLevel: 5 },
  { name: "Tissue paper", unit: "units", reorderLevel: 20 },
  { name: "Pinegel", unit: "kg", reorderLevel: 5 },
  { name: "Window cleaner", unit: "ltrs", reorderLevel: 5 },
  { name: "Bleach", unit: "ltrs", reorderLevel: 5 },
  { name: "Small binliners", unit: "units", reorderLevel: 10 },
  { name: "Handy wash", unit: "units", reorderLevel: 5 },
  { name: "Binliners", unit: "units", reorderLevel: 30 },
  { name: "Vim", unit: "kg", reorderLevel: 2 },
];

const AMENITY_CATALOG: Array<{ name: string; reorderLevel: number }> = [
  { name: "Body lotion", reorderLevel: 10 },
  { name: "Shower gel", reorderLevel: 10 },
  { name: "Soaps", reorderLevel: 20 },
  { name: "White sugar sachets", reorderLevel: 50 },
  { name: "Brown sugar sachets", reorderLevel: 20 },
];

const ACTIVITY_TYPES: ActivityType[] = ["Zipline", "Quad Bike", "Mountaineering", "Putt Putt", "Biking"];

const WEATHER_CONDITIONS: WeatherCondition[] = ["Clear", "Thunder/Lightning", "Extreme Heat", "Heavy Rain", "Unsafe Wind"];

const INCIDENT_NATURES: IncidentNature[] = [
  "Abrasions/Scrapes",
  "Bruising",
  "Sprain/Strain",
  "Cut/Laceration",
  "Broken Bone",
  "Concussion",
  "Heat/Sickness",
  "Other",
];

// Pre-use inspection items per Annexes 3 and 6, extended to the manual's other activity chapters.
const ACTIVITY_CHECKLIST_TEMPLATE: Record<ActivityType, string[]> = {
  Zipline: ["Harnesses", "Slider assemblies / sling lines", "Cable, pulleys & steel structure", "Nuts & bolts", "Helmets", "Braking system"],
  "Quad Bike": [
    "Tyres & pressure",
    "Steering & suspension bushes",
    "Front & rear shock absorbers",
    "Front & rear brakes",
    "Throttle",
    "Drive chain",
    "Oil level",
    "Fuel level & line",
  ],
  Biking: ["Tyres & pressure", "Brakes front & back", "Gears & chain", "Frame & handlebars", "Helmets"],
  Mountaineering: ["First aid kit stocked", "Water supplies", "Trail markers & signage", "Radio / communication check"],
  "Putt Putt": ["Course surface & holes", "Clubs & balls", "Scorecards stocked", "Safety signage posted"],
};

const ACTIVITY_PRICE: Record<ActivityType, number> = {
  Zipline: 45,
  "Quad Bike": 60,
  Mountaineering: 25,
  "Putt Putt": 10,
  Biking: 20,
};

function createDefaultActivityChecklistItems(activity: ActivityType): ActivityChecklistItem[] {
  return ACTIVITY_CHECKLIST_TEMPLATE[activity].map((label) => ({ label, status: "Pass" as ChecklistItemStatus }));
}

const STOCK_CATEGORIES: StockCategory[] = [
  "Food",
  "Beverages",
  "Cleaning Materials",
  "Office Supplies",
  "Maintenance Materials",
  "Activity Equipment",
  "Kitchen Equipment",
  "Bar Stock",
  "Uniforms",
  "Stationery",
];

const REQUEST_PRIORITIES: RequestPriority[] = ["Low", "Normal", "High", "Urgent"];

const ADJUSTMENT_REASONS: AdjustmentReason[] = ["Damage", "Loss", "Expiry", "Theft", "Counting Error", "Manual Correction"];

const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  "Fuel",
  "Transport",
  "Procurement",
  "Repairs & Maintenance",
  "Cleaning Materials",
  "Consumables",
  "Utilities",
  "Other",
];

const CASH_REGISTER_AREAS: CashRegisterArea[] = ["Reception", "Restaurant", "Bar", "Conference"];

const NIGHT_AUDIT_STEPS: Array<{ id: NightAuditStepId; title: string; description: string }> = [
  { id: "arrivals", title: "Verify Arrivals", description: "Confirm every expected arrival is checked in or logged as a no-show." },
  { id: "checkouts", title: "Verify Check-outs", description: "Ensure every departing guest has been checked out with a settled folio." },
  {
    id: "charges",
    title: "Verify Guest Charges & Payments",
    description: "Accommodation, restaurant & bar, and activities charges are posted, and cash/card/transfer payments reconcile.",
  },
  { id: "restaurant", title: "Verify Restaurant", description: "No open kitchen tickets and no unpaid orders remain on the floor." },
  { id: "cash", title: "Cash Reconciliation", description: "Every cash register is counted and any variance is approved by a manager." },
  { id: "reports", title: "Generate Reports", description: "Daily revenue, cash summary, guest ledger and outstanding accounts reports are produced." },
];

function computeLowStockAlerts(items: InventoryItem[]): LowStockAlert[] {
  return items
    .filter((item) => item.status === "Active" && item.currentQuantity <= item.reorderLevel)
    .map((item) => ({
      itemId: item.id,
      name: item.name,
      currentQuantity: item.currentQuantity,
      reorderLevel: item.reorderLevel,
      unit: item.unit,
      severity: item.currentQuantity <= item.minStock ? "danger" : "warning",
    }));
}

const MENU_CATALOG: MenuCatalogItem[] = [
  { name: "Chicken Burger", price: 12, category: "Food" },
  { name: "Greek Salad", price: 8, category: "Food" },
  { name: "Beef Skewers", price: 10, category: "Food" },
  { name: "Breakfast Plate", price: 9, category: "Food" },
  { name: "Mazoe Orange", price: 3, category: "Beverage" },
  { name: "Castle Lite", price: 4, category: "Alcohol" },
];

const MENU_BY_NAME: Record<string, MenuCatalogItem> = Object.fromEntries(MENU_CATALOG.map((item) => [item.name, item]));

// Condensed from the manual's Section F kitchen-closing SOP (21 items) and the separate
// dining room opening/closing checklist (28 items), grouped into representative line items.
const KITCHEN_CHECKLIST_TEMPLATE: Record<string, string[]> = {
  "Kitchen Area & Food Storage": [
    "Fridges, storage areas and floors cleaned",
    "Kitchen sinks emptied and wash-up area closed",
    "Rubbish removed and disposed of",
    "Utensils and chopping boards cleaned and sterilized",
    "Food items covered, labelled and stored correctly",
  ],
  "Equipment Shutdown & Security": [
    "Gas equipment switched off",
    "Hot plates, salamanders and fryers off and covered",
    "Power points and extraction fan disconnected",
    "Any deviations identified and rectified",
    "Doors, windows and alarms secured; keys deposited",
  ],
  "Dining Room Opening": [
    "Floors swept, chairs and tables set",
    "Stations stocked with glassware and silverware",
    "Water pitchers filled",
    "Reservations list checked for special requests",
    "Daily specials confirmed with kitchen",
  ],
  "Dining Room Closing": [
    "Tables, counters and menus sanitized",
    "Condiments and napkins restocked",
    "Glassware and silverware dried and stored",
    "Dessert cases and fridges cleaned; no food left out",
    "Handover notes left for next shift",
  ],
};

const KITCHEN_CHECKLIST_SECTIONS = Object.keys(KITCHEN_CHECKLIST_TEMPLATE);

const FRIDGE_SAFE_MAX_C = 5;

function createDefaultKitchenChecklistItems(): KitchenChecklistItem[] {
  return KITCHEN_CHECKLIST_SECTIONS.flatMap((section) =>
    KITCHEN_CHECKLIST_TEMPLATE[section].map((label) => ({ section, label, status: "Done" as TaskCheckStatus })),
  );
}

const money = new Intl.NumberFormat("en-ZW", {
  style: "currency",
  currency: "USD",
});

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const navigation: Array<{ id: ModuleId; label: string; icon: LucideIcon }> = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "frontOffice", label: "Front Office", icon: Hotel },
  { id: "restaurant", label: "Restaurant & Kitchen", icon: Utensils },
  { id: "operations", label: "Housekeeping & Activities", icon: BedDouble },
  { id: "procurement", label: "Procurement & Stores", icon: Warehouse },
  { id: "finance", label: "Finance & Night Audit", icon: CreditCard },
];

const dates = ["Jul 02", "Jul 03", "Jul 04", "Jul 05", "Jul 06", "Jul 07"];
const businessDateLabel = dates[0];
const businessDateIso = "2026-07-02";
const tomorrowDateLabel = dates[1];

type RoomStatusSummary = {
  occupied: number;
  available: number;
  dirty: number;
  staff: number;
  maintenance: number;
  byLodge: Record<Lodge, { occupied: number; available: number; dirty: number; staff: number; maintenance: number }>;
};

type DashboardMetrics = {
  inHouseGuests: Reservation[];
  arrivalsToday: Reservation[];
  departuresToday: Reservation[];
  readyRooms: number;
  dirtyRooms: number;
  hkQueueCount: number;
  latestChecklist?: HousekeepingChecklist;
  checklistSubmittedToday: boolean;
  roomSummary: RoomStatusSummary;
  newEnquiries: number;
  pendingMessages: number;
  pendingPurchases: number;
  newKitchenOrders: number;
  activeActivities: number;
  activitiesToday: ActivityBooking[];
  activitiesRevenueToday: number;
  openSafetyIncidents: number;
  activityEquipmentAlerts: ActivityEquipmentAlert[];
  arrivalsAwaitingActivity: Reservation[];
  restaurantRevenueToday: number;
  openKitchenTickets: number;
  openComplaints: number;
  kitchenChecklistSubmittedToday: boolean;
  latestKitchenChecklist?: KitchenClosingChecklist;
  kitchenChecklistAlerts: KitchenChecklistAlert[];
  procurementSpend: number;
  outstandingPOs: number;
  totalInventoryValue: number;
  lowStockCount: number;
  transfersToday: number;
  pendingStockMovements: number;
  openStockTakesWithVariance: number;
  accommodationRevenueToday: number;
  conferenceRevenueToday: number;
  totalRevenueToday: number;
  expensesToday: number;
  outstandingBalance: number;
  unresolvedCashVariances: number;
  businessDayClosed: boolean;
};

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function createDefaultLinen(): LinenCount[] {
  return LINEN_TYPES.map((type) => ({
    type,
    clean: 0,
    dirty: 0,
    parStock: LINEN_PAR_STOCK[type],
  }));
}

function createDefaultChemicals(): ChemicalStockItem[] {
  return CHEMICAL_CATALOG.map((item) => ({
    name: item.name,
    quantity: 0,
    unit: item.unit,
    reorderLevel: item.reorderLevel,
  }));
}

function createDefaultAmenities(): AmenityStockItem[] {
  return AMENITY_CATALOG.map((item) => ({
    name: item.name,
    quantity: 0,
    reorderLevel: item.reorderLevel,
  }));
}

function createSeedRooms(): Room[] {
  const rooms: Room[] = [];
  for (let i = 1; i <= 8; i += 1) {
    let status: RoomStatus = "Available";
    if (i === 1 || i === 2) status = "Occupied";
    if (i === 6) status = "Staff";
    rooms.push({ id: `z${i}`, number: `Zebra ${i}`, lodge: "Zebra", type: "Chalet", status });
  }
  for (let i = 1; i <= 6; i += 1) {
    let status: RoomStatus = "Dirty";
    if (i === 6) status = "Available";
    rooms.push({ id: `k${i}`, number: `Kudu ${i}`, lodge: "Kudu", type: "Chalet", status });
  }
  for (let i = 1; i <= 2; i += 1) {
    rooms.push({
      id: `i${i}`,
      number: `Impala ${i}`,
      lodge: "Impala",
      type: "Chalet",
      status: i === 1 ? "Occupied" : "Dirty",
    });
  }
  rooms.push({
    id: "d1",
    number: "Ladies Dormitory",
    lodge: "Dormitory",
    type: "Dormitory",
    status: "Dirty",
  });
  return rooms;
}

function createRoomStatusesFromRooms(rooms: Room[]): RoomStatusSnapshot[] {
  return rooms.map((room) => ({
    room: room.number,
    lodge: room.lodge,
    status: room.status,
  }));
}

function createSeedChecklist(): HousekeepingChecklist {
  return {
    id: "HKC-300626",
    date: "2026-06-30",
    submittedBy: "Memory",
    submittedAt: "08:15",
    linen: [
      { type: "Single bed sets", clean: 36, dirty: 11, parStock: 50 },
      { type: "Double bed sets", clean: 9, dirty: 5, parStock: 20 },
      { type: "Small white T/cloths", clean: 0, dirty: 23, parStock: 30 },
      { type: "Towels", clean: 9, dirty: 5, parStock: 25 },
    ],
    chemicals: [
      { name: "Dishwasher", quantity: 30, unit: "ltrs", reorderLevel: 10 },
      { name: "Degreaser", quantity: 23, unit: "ltrs", reorderLevel: 10 },
      { name: "Multi clean", quantity: 11, unit: "ltrs", reorderLevel: 5 },
      { name: "Bluefresh", quantity: 27, unit: "ltrs", reorderLevel: 10 },
      { name: "Hand Andy", quantity: 16, unit: "ltrs", reorderLevel: 5 },
      { name: "Imperial mint", quantity: 19, unit: "ltrs", reorderLevel: 5 },
      { name: "Tissue paper", quantity: 38, unit: "units", reorderLevel: 20 },
      { name: "Pinegel", quantity: 18, unit: "kg", reorderLevel: 5 },
      { name: "Window cleaner", quantity: 13, unit: "ltrs", reorderLevel: 5 },
      { name: "Bleach", quantity: 13, unit: "ltrs", reorderLevel: 5 },
      { name: "Small binliners", quantity: 8, unit: "units", reorderLevel: 10 },
      { name: "Handy wash", quantity: 10, unit: "units", reorderLevel: 5 },
      { name: "Binliners", quantity: 80, unit: "units", reorderLevel: 30 },
      { name: "Vim", quantity: 0, unit: "kg", reorderLevel: 2 },
    ],
    amenities: [
      { name: "Body lotion", quantity: 0, reorderLevel: 10 },
      { name: "Shower gel", quantity: 0, reorderLevel: 10 },
      { name: "Soaps", quantity: 74, reorderLevel: 20 },
      { name: "White sugar sachets", quantity: 165, reorderLevel: 50 },
      { name: "Brown sugar sachets", quantity: 10, reorderLevel: 20 },
    ],
    roomStatuses: [
      { room: "Zebra 1", lodge: "Zebra", status: "Occupied" },
      { room: "Zebra 2", lodge: "Zebra", status: "Occupied" },
      { room: "Zebra 3", lodge: "Zebra", status: "Available" },
      { room: "Zebra 4", lodge: "Zebra", status: "Available" },
      { room: "Zebra 5", lodge: "Zebra", status: "Available" },
      { room: "Zebra 6", lodge: "Zebra", status: "Staff", notes: "Ladies staff room" },
      { room: "Zebra 7", lodge: "Zebra", status: "Available" },
      { room: "Zebra 8", lodge: "Zebra", status: "Available" },
      { room: "Kudu 1", lodge: "Kudu", status: "Dirty" },
      { room: "Kudu 2", lodge: "Kudu", status: "Dirty" },
      { room: "Kudu 3", lodge: "Kudu", status: "Dirty" },
      { room: "Kudu 4", lodge: "Kudu", status: "Dirty" },
      { room: "Kudu 5", lodge: "Kudu", status: "Dirty" },
      { room: "Kudu 6", lodge: "Kudu", status: "Available" },
      { room: "Impala 1", lodge: "Impala", status: "Available" },
      { room: "Impala 2", lodge: "Impala", status: "Dirty" },
      { room: "Ladies Dormitory", lodge: "Dormitory", status: "Dirty" },
    ],
  };
}

function computeStockAlerts(checklist: HousekeepingChecklist | undefined): StockAlert[] {
  if (!checklist) return [];

  const alerts: StockAlert[] = [];

  checklist.linen.forEach((item) => {
    if (item.clean === 0) {
      alerts.push({
        kind: "linen",
        item: item.type,
        message: `${item.type}: 0 clean available (${item.dirty} dirty)`,
        severity: "danger",
      });
    } else if (item.clean + item.dirty !== item.parStock) {
      alerts.push({
        kind: "linen",
        item: item.type,
        message: `${item.type}: clean + dirty (${item.clean + item.dirty}) does not match par stock (${item.parStock})`,
        severity: "warning",
      });
    }
  });

  checklist.chemicals.forEach((item) => {
    if (item.quantity <= item.reorderLevel) {
      alerts.push({
        kind: "chemical",
        item: item.name,
        message: `${item.name}: ${item.quantity}${item.unit} at or below reorder level (${item.reorderLevel}${item.unit})`,
        severity: item.quantity === 0 ? "danger" : "warning",
      });
    }
  });

  checklist.amenities.forEach((item) => {
    if (item.quantity <= item.reorderLevel) {
      alerts.push({
        kind: "amenity",
        item: item.name,
        message: `${item.name}: ${item.quantity} units at or below reorder level (${item.reorderLevel})`,
        severity: item.quantity === 0 ? "danger" : "warning",
      });
    }
  });

  return alerts;
}

function getLatestChecklist(checklists: HousekeepingChecklist[]) {
  return [...checklists].sort((a, b) => b.date.localeCompare(a.date))[0];
}

function getLatestActivityChecklists(checklists: ActivityDailyChecklist[]): Partial<Record<ActivityType, ActivityDailyChecklist>> {
  const latest: Partial<Record<ActivityType, ActivityDailyChecklist>> = {};
  [...checklists]
    .sort((a, b) => a.date.localeCompare(b.date))
    .forEach((checklist) => {
      latest[checklist.activity] = checklist;
    });
  return latest;
}

function computeActivityEquipmentAlerts(checklists: ActivityDailyChecklist[]): ActivityEquipmentAlert[] {
  const latest = getLatestActivityChecklists(checklists);
  const alerts: ActivityEquipmentAlert[] = [];

  ACTIVITY_TYPES.forEach((activity) => {
    const checklist = latest[activity];
    if (!checklist) return;
    checklist.items
      .filter((item) => item.status === "Fail")
      .forEach((item) => alerts.push({ activity, item: item.label, checklistDate: checklist.date }));
  });

  return alerts;
}

function getLatestKitchenChecklist(checklists: KitchenClosingChecklist[]) {
  return [...checklists].sort((a, b) => b.date.localeCompare(a.date))[0];
}

function computeKitchenChecklistAlerts(checklist: KitchenClosingChecklist | undefined): KitchenChecklistAlert[] {
  if (!checklist) return [];

  const alerts: KitchenChecklistAlert[] = checklist.items
    .filter((item) => item.status === "Pending")
    .map((item) => ({ section: item.section, item: item.label, checklistDate: checklist.date }));

  if (checklist.fridgeTempC > FRIDGE_SAFE_MAX_C) {
    alerts.push({
      section: "Kitchen Area & Food Storage",
      item: `Fridge reading ${checklist.fridgeTempC}°C - above the ${FRIDGE_SAFE_MAX_C}°C safe limit`,
      checklistDate: checklist.date,
    });
  }

  return alerts;
}

function summarizeRoomStatuses(rooms: Room[]): RoomStatusSummary {
  const byLodge = LODGE_ORDER.reduce(
    (accumulator, lodge) => ({
      ...accumulator,
      [lodge]: { occupied: 0, available: 0, dirty: 0, staff: 0, maintenance: 0 },
    }),
    {} as RoomStatusSummary["byLodge"],
  );

  const summary: RoomStatusSummary = {
    occupied: 0,
    available: 0,
    dirty: 0,
    staff: 0,
    maintenance: 0,
    byLodge,
  };

  rooms.forEach((room) => {
    if (room.status === "Occupied") summary.occupied += 1;
    if (room.status === "Available") summary.available += 1;
    if (room.status === "Dirty") summary.dirty += 1;
    if (room.status === "Staff") summary.staff += 1;
    if (room.status === "Maintenance") summary.maintenance += 1;

    const lodgeSummary = summary.byLodge[room.lodge];
    if (room.status === "Occupied") lodgeSummary.occupied += 1;
    if (room.status === "Available") lodgeSummary.available += 1;
    if (room.status === "Dirty") lodgeSummary.dirty += 1;
    if (room.status === "Staff") lodgeSummary.staff += 1;
    if (room.status === "Maintenance") lodgeSummary.maintenance += 1;
  });

  return summary;
}

function buildDashboardMetrics(state: DemoState): DashboardMetrics {
  const latestChecklist = getLatestChecklist(state.housekeepingChecklists);
  const roomSummary = summarizeRoomStatuses(state.rooms);
  const financeTotals = computeFinanceTotals(state);

  const arrivalsToday = state.reservations.filter(
    (reservation) => reservation.arrival === businessDateLabel && reservation.status !== "Checked In" && reservation.status !== "Cancelled",
  );
  const activitiesToday = state.activities.filter((booking) => booking.date === businessDateLabel && booking.status !== "Closed");
  const bookedGuestNames = new Set(state.activities.filter((booking) => booking.date === businessDateLabel).map((booking) => booking.guest.toLowerCase()));

  return {
    inHouseGuests: state.reservations.filter((reservation) => reservation.status === "Checked In"),
    arrivalsToday,
    departuresToday: state.reservations.filter(
      (reservation) => reservation.departure === businessDateLabel && reservation.status === "Checked In",
    ),
    readyRooms: roomSummary.available,
    dirtyRooms: roomSummary.dirty,
    hkQueueCount: state.housekeeping.filter((task) => task.status !== "Available").length,
    latestChecklist,
    checklistSubmittedToday: state.housekeepingChecklists.some((checklist) => checklist.date === businessDateIso),
    roomSummary,
    newEnquiries: state.enquiries.filter((enquiry) => enquiry.status === "New").length,
    pendingMessages: state.messages.filter((message) => message.status !== "Delivered").length,
    pendingPurchases: state.purchaseRequests.filter((request) => request.status === "Pending Approval").length,
    newKitchenOrders: state.orders.filter((order) => order.kitchenStatus === "New").length,
    activeActivities: state.activities.filter((booking) => booking.status === "In Progress").length,
    activitiesToday,
    activitiesRevenueToday: activitiesToday.reduce((sum, booking) => sum + booking.price, 0),
    openSafetyIncidents: state.safetyIncidents.filter((report) => report.status !== "Resolved").length,
    activityEquipmentAlerts: computeActivityEquipmentAlerts(state.activityChecklists),
    arrivalsAwaitingActivity: arrivalsToday.filter((reservation) => !bookedGuestNames.has(reservation.guest.toLowerCase())),
    restaurantRevenueToday: state.orders.reduce((sum, order) => sum + order.total, 0),
    openKitchenTickets: state.orders.filter((order) => order.kitchenStatus !== "Completed").length,
    openComplaints: state.complaints.filter((complaint) => complaint.status !== "Resolved").length,
    kitchenChecklistSubmittedToday: state.kitchenChecklists.some((checklist) => checklist.date === businessDateIso),
    latestKitchenChecklist: getLatestKitchenChecklist(state.kitchenChecklists),
    kitchenChecklistAlerts: computeKitchenChecklistAlerts(getLatestKitchenChecklist(state.kitchenChecklists)),
    procurementSpend: state.purchaseOrders.reduce((sum, order) => sum + order.total, 0),
    outstandingPOs: state.purchaseOrders.filter((order) => order.status === "Issued").length,
    totalInventoryValue: state.inventoryItems.reduce((sum, item) => sum + item.currentQuantity * item.averageCost, 0),
    lowStockCount: computeLowStockAlerts(state.inventoryItems).length,
    transfersToday: state.stockMovements.filter((movement) => movement.type === "Transfer" && movement.date === businessDateLabel).length,
    pendingStockMovements: state.stockMovements.filter((movement) => movement.status === "Pending Approval").length,
    openStockTakesWithVariance: state.stockTakes.filter(
      (stockTake) => stockTake.status === "Open" && stockTake.items.some((line) => line.countedQuantity !== line.expectedQuantity),
    ).length,
    accommodationRevenueToday: financeTotals.accommodationRevenue,
    conferenceRevenueToday: financeTotals.conferenceRevenue,
    totalRevenueToday: financeTotals.totalRevenue,
    expensesToday: financeTotals.expensesToday,
    outstandingBalance: financeTotals.outstandingBalance,
    unresolvedCashVariances: financeTotals.unresolvedVarianceCount,
    businessDayClosed: state.businessDay.status === "Closed",
  };
}

// ---------------------------------------------------------------------------
// Finance: guest folios, department revenue, cash reconciliation, alerts.
// Every department posts revenue automatically here - no manual recapturing.
// ---------------------------------------------------------------------------

type GuestFolioLine = {
  department: "Accommodation" | "Restaurant & Bar" | "Activities";
  reference: string;
  description: string;
  amount: number;
  settled: boolean;
};

type GuestFolio = {
  lines: GuestFolioLine[];
  nights: number;
  accommodationTotal: number;
  accommodationOutstanding: number;
  restaurantOutstanding: number;
  activitiesOutstanding: number;
  totalCharges: number;
  totalOutstanding: number;
};

function buildGuestFolio(state: DemoState, reservation: Reservation): GuestFolio {
  const nights = Math.max(1, dates.indexOf(reservation.departure) - dates.indexOf(reservation.arrival));
  const rate = reservation.rate ?? 0;
  const accommodationTotal = nights * rate;

  const roomOrders = state.orders.filter((order) => order.guest === reservation.guest && order.payment === "Room Charge");
  const roomActivities = state.activities.filter((booking) => booking.guest === reservation.guest && booking.payment === "Room Charge");

  const lines: GuestFolioLine[] = [
    {
      department: "Accommodation",
      reference: reservation.id,
      description: `${nights} night${nights === 1 ? "" : "s"} in ${reservation.room} @ ${money.format(rate)}`,
      amount: accommodationTotal,
      settled: reservation.balance === 0,
    },
    ...roomOrders.map((order) => ({
      department: "Restaurant & Bar" as const,
      reference: order.id,
      description: order.items.map((item) => `${item.quantity}x ${item.name}`).join(", "),
      amount: order.total,
      settled: Boolean(order.settledAt),
    })),
    ...roomActivities.map((booking) => ({
      department: "Activities" as const,
      reference: booking.id,
      description: `${booking.activity} (${booking.participants} pax)`,
      amount: booking.price,
      settled: Boolean(booking.settledAt),
    })),
  ];

  const restaurantOutstanding = roomOrders.filter((order) => !order.settledAt).reduce((sum, order) => sum + order.total, 0);
  const activitiesOutstanding = roomActivities.filter((booking) => !booking.settledAt).reduce((sum, booking) => sum + booking.price, 0);
  const totalCharges = lines.reduce((sum, line) => sum + line.amount, 0);

  return {
    lines,
    nights,
    accommodationTotal,
    accommodationOutstanding: reservation.balance,
    restaurantOutstanding,
    activitiesOutstanding,
    totalCharges,
    totalOutstanding: reservation.balance + restaurantOutstanding + activitiesOutstanding,
  };
}

function computeExpectedCash(state: DemoState, register: CashRegister): number {
  let received = 0;
  if (register.area === "Reception") {
    received =
      state.receipts.filter((receipt) => receipt.method === "Cash").reduce((sum, receipt) => sum + receipt.amount, 0) +
      state.activities.filter((booking) => booking.payment === "Cash").reduce((sum, booking) => sum + booking.price, 0);
  } else if (register.area === "Restaurant") {
    received = state.orders
      .filter((order) => order.payment === "Cash" && !order.containsAlcohol)
      .reduce((sum, order) => sum + order.total, 0);
  } else if (register.area === "Bar") {
    received = state.orders
      .filter((order) => order.payment === "Cash" && order.containsAlcohol)
      .reduce((sum, order) => sum + order.total, 0);
  }
  return register.openingFloat + received - register.cashPaidOut - register.refunds;
}

function computeCashVariance(state: DemoState, register: CashRegister): number {
  if (register.actualCash === undefined) return 0;
  return Number((register.actualCash - computeExpectedCash(state, register)).toFixed(2));
}

type FinanceTotals = {
  accommodationRevenue: number;
  conferenceRevenue: number;
  restaurantRevenue: number;
  activitiesRevenue: number;
  totalRevenue: number;
  cashReceived: number;
  cardReceived: number;
  transferReceived: number;
  ecocashReceived: number;
  expensesToday: number;
  netRevenue: number;
  outstandingBalance: number;
  cashVarianceTotal: number;
  unresolvedVarianceCount: number;
};

function computeFinanceTotals(state: DemoState): FinanceTotals {
  const businessIndex = dates.indexOf(businessDateLabel);
  const tradingReservations = state.reservations.filter(
    (reservation) =>
      reservation.status !== "Cancelled" &&
      businessIndex >= dates.indexOf(reservation.arrival) &&
      businessIndex < dates.indexOf(reservation.departure),
  );
  const accommodationRevenue = tradingReservations
    .filter((reservation) => reservation.purpose !== "Conference Group")
    .reduce((sum, reservation) => sum + (reservation.rate ?? 0), 0);
  const conferenceRevenue = tradingReservations
    .filter((reservation) => reservation.purpose === "Conference Group")
    .reduce((sum, reservation) => sum + (reservation.rate ?? 0), 0);
  const restaurantRevenue = state.orders.reduce((sum, order) => sum + order.total, 0);
  const activitiesRevenue = state.activities
    .filter((booking) => booking.date === businessDateLabel)
    .reduce((sum, booking) => sum + booking.price, 0);
  const totalRevenue = accommodationRevenue + conferenceRevenue + restaurantRevenue + activitiesRevenue;

  const paymentTotal = (method: PaymentMethod) =>
    state.receipts.filter((receipt) => receipt.method === method).reduce((sum, receipt) => sum + receipt.amount, 0) +
    state.orders.filter((order) => order.payment === method).reduce((sum, order) => sum + order.total, 0) +
    state.activities.filter((booking) => booking.payment === method).reduce((sum, booking) => sum + booking.price, 0);

  const expensesToday = state.expenses.filter((expense) => expense.date === businessDateIso).reduce((sum, expense) => sum + expense.amount, 0);

  const outstandingBalance =
    state.reservations.reduce((sum, reservation) => sum + reservation.balance, 0) +
    state.orders.filter((order) => order.payment === "Room Charge" && !order.settledAt).reduce((sum, order) => sum + order.total, 0) +
    state.activities.filter((booking) => booking.payment === "Room Charge" && !booking.settledAt).reduce((sum, booking) => sum + booking.price, 0);

  const variances = state.cashRegisters.map((register) => computeCashVariance(state, register));
  const cashVarianceTotal = variances.reduce((sum, variance) => sum + Math.abs(variance), 0);
  const unresolvedVarianceCount = state.cashRegisters.filter(
    (register) => register.actualCash !== undefined && computeCashVariance(state, register) !== 0 && register.status !== "Variance Approved",
  ).length;

  return {
    accommodationRevenue,
    conferenceRevenue,
    restaurantRevenue,
    activitiesRevenue,
    totalRevenue,
    cashReceived: paymentTotal("Cash"),
    cardReceived: paymentTotal("Card"),
    transferReceived: paymentTotal("Bank Transfer"),
    ecocashReceived: paymentTotal("Ecocash"),
    expensesToday,
    netRevenue: totalRevenue - expensesToday,
    outstandingBalance,
    cashVarianceTotal,
    unresolvedVarianceCount,
  };
}

type FinanceAlert = { key: string; icon: LucideIcon; title: string; description: string };

function computeFinanceAlerts(state: DemoState): FinanceAlert[] {
  const alerts: FinanceAlert[] = [];

  const unresolvedVariances = state.cashRegisters.filter(
    (register) => register.actualCash !== undefined && computeCashVariance(state, register) !== 0 && register.status !== "Variance Approved",
  );
  if (unresolvedVariances.length > 0) {
    alerts.push({
      key: "cash-variance",
      icon: AlertTriangle,
      title: `${unresolvedVariances.length} cash register${unresolvedVariances.length > 1 ? "s" : ""} with unresolved variance`,
      description: unresolvedVariances
        .map((register) => `${register.area} (${money.format(computeCashVariance(state, register))})`)
        .join(", "),
    });
  }

  const departingWithBalance = state.reservations.filter((reservation) => reservation.departure === businessDateLabel && reservation.balance > 0);
  if (departingWithBalance.length > 0) {
    alerts.push({
      key: "outstanding-departures",
      icon: FileText,
      title: `${departingWithBalance.length} departing guest${departingWithBalance.length > 1 ? "s" : ""} with an outstanding balance`,
      description: departingWithBalance.map((reservation) => `${reservation.guest} (${money.format(reservation.balance)})`).join(", "),
    });
  }

  const openRoomCharges = [
    ...state.orders.filter((order) => order.payment === "Room Charge" && !order.settledAt && order.kitchenStatus === "Completed"),
  ];
  if (state.businessDay.status === "Trading" && !state.nightAuditRuns.some((run) => run.businessDate === businessDateIso && run.status === "In Progress")) {
    alerts.push({
      key: "night-audit-not-started",
      icon: ClipboardCheck,
      title: "Night audit not yet started for today's business date",
      description: `Business date ${businessDateLabel} is still open - ${openRoomCharges.length} settled kitchen ticket${openRoomCharges.length === 1 ? "" : "s"} still on room accounts.`,
    });
  }

  return alerts;
}

function formatChecklistDateLabel(date: string) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year.slice(2)}`;
}

function roomStatusWhatsAppLabel(status: RoomStatus) {
  if (status === "Available") return "vacant";
  if (status === "Occupied") return "occupied";
  if (status === "Dirty") return "checkout";
  if (status === "Staff") return "staff";
  return status.toLowerCase();
}

function formatChecklistAsWhatsApp(checklist: HousekeepingChecklist) {
  const lines: string[] = [
    "Good morning",
    "HOUSEKEEPING CHECKLIST",
    `*${formatChecklistDateLabel(checklist.date)}*`,
    "",
    "*CLEAN LINEN* *AVAILABLE*",
    ...checklist.linen.map((item) => `${item.type} x ${item.clean}`),
    "",
    "*Dirty* *linen*",
    ...checklist.linen.map((item) => `${item.type} x ${item.dirty}`),
    "",
    "*Chemical* **checklist*",
    ...checklist.chemicals.map((item) => `${item.name} x${item.quantity}${item.unit}`),
    "",
    "*Guest*Amenities",
    ...checklist.amenities.map((item) => `${item.name} x ${item.quantity}`),
    "",
    "*Rooms*occupancy*",
    "",
    ...checklist.roomStatuses.map((snapshot) => {
      const note = snapshot.notes ? ` (${snapshot.notes})` : "";
      return `${snapshot.room}- ${roomStatusWhatsAppLabel(snapshot.status)}${note}`;
    }),
  ];

  if (checklist.notes) {
    lines.push("", `Notes: ${checklist.notes}`);
  }

  return lines.join("\n");
}

function createSeedState(): DemoState {
  const rooms = createSeedRooms();
  return {
    rooms,
    reservations: [
      {
        id: "RSV-1042",
        guest: "Tariro Moyo",
        organisation: "Moyo Family",
        phone: "+263 77 123 4567",
        email: "tariro.moyo@example.com",
        room: "Zebra 1",
        arrival: "Jul 02",
        departure: "Jul 05",
        guests: 4,
        status: "Checked In",
        payment: "Paid",
        balance: 0,
        purpose: "Accommodation",
        rate: 110,
        idNumber: "63-112233A45",
        vehicle: "AEK 4521",
      },
      {
        id: "RSV-1043",
        guest: "Blessing Ncube",
        organisation: "Ncube Holdings",
        phone: "+263 71 555 9090",
        email: "blessing@ncubeholdings.co.zw",
        room: "Zebra 3",
        arrival: "Jul 03",
        departure: "Jul 06",
        guests: 2,
        status: "Guaranteed",
        payment: "Deposit Paid",
        balance: 180,
        purpose: "Accommodation",
        rate: 110,
      },
      {
        id: "RSV-1044",
        guest: "Sarah Davies",
        organisation: "Harare School Camp",
        phone: "+263 78 222 3344",
        email: "bookings@harareschoolcamp.co.zw",
        room: "Impala 1",
        arrival: "Jul 02",
        departure: "Jul 07",
        guests: 28,
        status: "Confirmed",
        payment: "Outstanding",
        balance: 1260,
        purpose: "Conference Group",
        rate: 45,
      },
    ],
    housekeeping: [
      { id: "HK-88", room: "Kudu 2", assignedTo: "Memory", status: "Queued", priority: "High" },
      { id: "HK-89", room: "Impala 2", assignedTo: "Unassigned", status: "Queued", priority: "Normal" },
    ],
    orders: [
      {
        id: "KOT-221",
        table: "Table 4",
        waiter: "Lynette",
        guest: "Tariro Moyo",
        items: [
          { name: "Chicken Burger", price: 12, quantity: 2 },
          { name: "Greek Salad", price: 8, quantity: 1 },
          { name: "Mazoe Orange", price: 3, quantity: 3 },
        ],
        total: 41,
        payment: "Room Charge",
        kitchenStatus: "Preparing",
        containsAlcohol: false,
        ageVerified: true,
        placedAt: "08:52",
      },
      {
        id: "KOT-222",
        table: "Bar Counter",
        waiter: "Farai",
        guest: "Walk-in",
        items: [
          { name: "Beef Skewers", price: 10, quantity: 2 },
          { name: "Castle Lite", price: 4, quantity: 2 },
        ],
        total: 28,
        payment: "Cash",
        kitchenStatus: "New",
        containsAlcohol: true,
        ageVerified: true,
        placedAt: "09:05",
        settledAt: "09:05",
      },
    ],
    suppliers: [
      {
        id: "SUP-1",
        name: "Mutare Fresh Foods",
        category: "Food & Produce",
        contactPerson: "Rudo Chapfika",
        phone: "+263 71 233 1187",
        email: "orders@mutarefresh.co.zw",
        preferred: true,
        paymentTerms: "7 days",
        status: "Active",
      },
      {
        id: "SUP-2",
        name: "Rusape Hardware",
        category: "Hardware & Maintenance",
        contactPerson: "Simba Gwenzi",
        phone: "+263 77 809 2244",
        preferred: false,
        paymentTerms: "Cash on Delivery",
        status: "Active",
      },
      {
        id: "SUP-3",
        name: "Bulawayo Beverages",
        category: "Beverages",
        contactPerson: "Kudzai Ndlovu",
        phone: "+263 78 445 6621",
        email: "sales@bulawayobev.co.zw",
        preferred: true,
        paymentTerms: "30 days",
        status: "Active",
      },
    ],
    inventoryItems: [
      {
        id: "ITM-001",
        name: "Castle Lite (case)",
        category: "Bar Stock",
        unit: "case",
        supplierId: "SUP-3",
        reorderLevel: 10,
        minStock: 5,
        maxStock: 40,
        currentQuantity: 6,
        averageCost: 20,
        status: "Active",
      },
      {
        id: "ITM-002",
        name: "Chicken",
        category: "Food",
        unit: "kg",
        supplierId: "SUP-1",
        reorderLevel: 15,
        minStock: 10,
        maxStock: 60,
        currentQuantity: 22,
        averageCost: 4.5,
        status: "Active",
      },
      {
        id: "ITM-003",
        name: "Pool Pump Fittings",
        category: "Maintenance Materials",
        unit: "set",
        supplierId: "SUP-2",
        reorderLevel: 2,
        minStock: 1,
        maxStock: 6,
        currentQuantity: 4,
        averageCost: 61.25,
        status: "Active",
      },
      {
        id: "ITM-004",
        name: "Diesel",
        category: "Maintenance Materials",
        unit: "ltrs",
        supplierId: "SUP-2",
        reorderLevel: 20,
        minStock: 10,
        maxStock: 100,
        currentQuantity: 15,
        averageCost: 1.6,
        status: "Active",
      },
    ],
    stockMovements: [
      {
        id: "SM-1",
        type: "Issue",
        itemId: "ITM-002",
        itemName: "Chicken",
        unit: "kg",
        quantity: 5,
        department: "Kitchen",
        reason: "Daily prep for breakfast service",
        requestedBy: "Chef",
        date: "Jul 02",
        status: "Pending Approval",
      },
      {
        id: "SM-2",
        type: "Issue",
        itemId: "ITM-001",
        itemName: "Castle Lite (case)",
        unit: "case",
        quantity: 3,
        department: "Bar",
        reason: "Restocking bar fridge",
        requestedBy: "Farai",
        date: "Jul 01",
        status: "Completed",
        approvedBy: "Stores Officer",
      },
      {
        id: "SM-3",
        type: "Transfer",
        itemId: "ITM-004",
        itemName: "Diesel",
        unit: "ltrs",
        quantity: 10,
        fromLocation: "Main Stores",
        toLocation: "Maintenance",
        reason: "Generator refuel run",
        requestedBy: "Blessing",
        date: "Jul 01",
        status: "Completed",
      },
      {
        id: "SM-4",
        type: "Adjustment",
        itemId: "ITM-001",
        itemName: "Castle Lite (case)",
        unit: "case",
        quantity: -2,
        adjustmentReason: "Damage",
        reason: "Two bottles broke during delivery unloading",
        requestedBy: "Farai",
        date: "Jul 02",
        status: "Pending Approval",
      },
    ],
    stockTakes: [
      {
        id: "ST-1",
        date: "Jul 01",
        countedBy: "Stores Officer",
        status: "Approved",
        approvedBy: "Manager",
        items: [
          { itemId: "ITM-001", itemName: "Castle Lite (case)", unit: "case", expectedQuantity: 6, countedQuantity: 6 },
          { itemId: "ITM-002", itemName: "Chicken", unit: "kg", expectedQuantity: 23, countedQuantity: 22 },
          { itemId: "ITM-003", itemName: "Pool Pump Fittings", unit: "set", expectedQuantity: 4, countedQuantity: 4 },
          { itemId: "ITM-004", itemName: "Diesel", unit: "ltrs", expectedQuantity: 15, countedQuantity: 15 },
        ],
      },
      {
        id: "ST-2",
        date: "Jul 02",
        countedBy: "Tendai",
        status: "Open",
        items: [
          { itemId: "ITM-001", itemName: "Castle Lite (case)", unit: "case", expectedQuantity: 6, countedQuantity: 6 },
          { itemId: "ITM-002", itemName: "Chicken", unit: "kg", expectedQuantity: 22, countedQuantity: 22 },
          { itemId: "ITM-003", itemName: "Pool Pump Fittings", unit: "set", expectedQuantity: 4, countedQuantity: 3 },
          { itemId: "ITM-004", itemName: "Diesel", unit: "ltrs", expectedQuantity: 15, countedQuantity: 15 },
        ],
      },
    ],
    purchaseRequests: [
      {
        id: "PR-318",
        department: "Kitchen",
        requestedBy: "Tendai",
        requestDate: "Jul 01",
        priority: "Normal",
        requiredDate: "Jul 04",
        reason: "Weekly kitchen restock running low ahead of the school camp group.",
        items: [
          { itemId: "ITM-002", description: "Chicken", quantity: 60, estimatedCost: 270 },
          { description: "Vegetables and breakfast stock", quantity: 1, estimatedCost: 350 },
        ],
        estimatedTotal: 620,
        status: "Pending Approval",
      },
      {
        id: "PR-320",
        department: "Bar",
        requestedBy: "Farai",
        requestDate: "Jul 02",
        priority: "High",
        requiredDate: "Jul 05",
        reason: "Castle Lite is below reorder level with a conference group arriving.",
        items: [{ itemId: "ITM-001", description: "Castle Lite (case)", quantity: 30, estimatedCost: 600 }],
        estimatedTotal: 600,
        status: "Approved",
      },
      {
        id: "PR-319",
        department: "Maintenance",
        requestedBy: "Blessing",
        requestDate: "Jun 28",
        priority: "High",
        requiredDate: "Jul 01",
        reason: "Pool pump fittings needed for Kudu lodge repairs.",
        items: [{ itemId: "ITM-003", description: "Pool pump fittings", quantity: 4, estimatedCost: 245 }],
        estimatedTotal: 245,
        status: "Converted to PO",
      },
      {
        id: "PR-321",
        department: "Kitchen",
        requestedBy: "Chef",
        requestDate: "Jul 02",
        priority: "Urgent",
        requiredDate: "Jul 04",
        reason: "Chicken stock will run out before the weekend.",
        items: [{ itemId: "ITM-002", description: "Chicken (restock)", quantity: 15, estimatedCost: 67.5 }],
        estimatedTotal: 67.5,
        status: "Converted to PO",
      },
    ],
    purchaseOrders: [
      {
        id: "PO-901",
        requestId: "PR-319",
        supplierId: "SUP-2",
        department: "Maintenance",
        issueDate: "Jun 29",
        deliveryDate: "Jul 01",
        requestedBy: "Blessing",
        approvedBy: "Manager",
        items: [
          { itemId: "ITM-003", description: "Pool pump fittings", quantityOrdered: 4, quantityReceived: 4, unitPrice: 61.25, condition: "Good" },
        ],
        total: 245,
        status: "Goods Received",
        receivedBy: "Blessing",
        receivedDate: "Jul 01",
        receivingComments: "All fittings received in good condition, pump repaired same day.",
      },
      {
        id: "PO-902",
        requestId: "PR-321",
        supplierId: "SUP-1",
        department: "Kitchen",
        issueDate: "Jul 02",
        deliveryDate: "Jul 04",
        requestedBy: "Chef",
        approvedBy: "Manager",
        items: [{ itemId: "ITM-002", description: "Chicken (restock)", quantityOrdered: 15, quantityReceived: 0, unitPrice: 4.5 }],
        total: 67.5,
        status: "Issued",
      },
    ],
    activities: [
      {
        id: "ACT-514",
        activity: "Quad Bike",
        guest: "Blessing Ncube",
        participants: 2,
        date: "Jul 03",
        time: "10:30",
        instructor: "Tawanda",
        status: "Booked",
        price: 60,
        payment: "Room Charge",
        ageConfirmed: true,
        guardianPresent: false,
        medicalClear: true,
        indemnitySigned: true,
      },
      {
        id: "ACT-515",
        activity: "Zipline",
        guest: "Nyasha Chikafu",
        participants: 4,
        date: "Jul 02",
        time: "14:00",
        instructor: "Chipo",
        status: "In Progress",
        price: 45,
        payment: "Cash",
        settledAt: "13:55",
        ageConfirmed: true,
        guardianPresent: false,
        weightKg: 68,
        medicalClear: true,
        indemnitySigned: true,
      },
    ],
    activityChecklists: [
      {
        id: "AC-1",
        activity: "Zipline",
        date: "2026-07-02",
        submittedBy: "Chipo",
        submittedAt: "07:40",
        weather: "Clear",
        items: createDefaultActivityChecklistItems("Zipline"),
      },
      {
        id: "AC-2",
        activity: "Quad Bike",
        date: "2026-07-02",
        submittedBy: "Tawanda",
        submittedAt: "07:55",
        weather: "Clear",
        items: [
          { label: "Tyres & pressure", status: "Pass" },
          { label: "Steering & suspension bushes", status: "Pass" },
          { label: "Front & rear shock absorbers", status: "Pass" },
          { label: "Front & rear brakes", status: "Fail" },
          { label: "Throttle", status: "Pass" },
          { label: "Drive chain", status: "Pass" },
          { label: "Oil level", status: "Pass" },
          { label: "Fuel level & line", status: "Pass" },
        ],
        notes: "Quad 03 rear brake spongy - pulled from the fleet pending mechanic sign-off.",
      },
    ],
    enquiries: [
      {
        id: "ENQ-742",
        source: "WhatsApp",
        guest: "Amai Sibanda",
        request: "Family chalet, dinner, zipline for 6 guests",
        arrival: "Jul 12",
        status: "Follow-up",
        nextStep: "Call back after quotation review",
      },
      {
        id: "ENQ-743",
        source: "Email",
        guest: "Bulawayo Training Institute",
        request: "Conference, lunch, tea breaks, 18 rooms",
        arrival: "Jul 18",
        status: "Quoted",
        nextStep: "Await purchase order confirmation",
      },
      {
        id: "ENQ-744",
        source: "Walk-in",
        guest: "David Moyo",
        request: "One night walk-in, king leisure bed",
        arrival: "Jul 02",
        status: "New",
        nextStep: "Check vacant clean room or waitlist",
      },
    ],
    manualTasks: [
      { id: "MT-1", area: "Zebra 3", item: "Registration card printed and signed", owner: "Reception", status: "Pending" },
      { id: "MT-2", area: "Conference Hall", item: "Projector, flip chart, diesel, water and folders checked", owner: "Front Office", status: "Needs Attention" },
      { id: "MT-5", area: "Kudu 2", item: "Towels, soap, shower drainage, lights and verandah checked", owner: "Housekeeping", status: "Needs Attention" },
    ],
    kitchenChecklists: [
      {
        id: "KC-1",
        date: "2026-07-01",
        submittedBy: "Chef",
        submittedAt: "22:10",
        fridgeTempC: 6,
        items: createDefaultKitchenChecklistItems().map((item) =>
          item.label === "Power points and extraction fan disconnected" ? { ...item, status: "Pending" } : item,
        ),
        notes: "Extraction fan breaker tripped - logged for maintenance follow-up.",
      },
    ],
    messages: [
      {
        id: "MSG-91",
        guest: "Blessing Ncube",
        room: "Zebra 3",
        caller: "Ncube Holdings Accounts",
        message: "Bank transfer proof will be sent before 16:00.",
        status: "Held for Arrival",
      },
      {
        id: "MSG-92",
        guest: "Tariro Moyo",
        room: "Zebra 1",
        caller: "Sarah Moyo",
        message: "Please call back about tomorrow's activity booking.",
        status: "Placed in Key Box",
      },
    ],
    keyLogs: [
      { id: "KEY-44", room: "Zebra 1", action: "Issued", reason: "Guest check-in", staff: "Reception" },
      { id: "KEY-45", room: "Zebra 6", action: "Spare Key Released", reason: "Staff room inspection", staff: "Supervisor" },
      { id: "KEY-46", room: "Kudu 2", action: "Missing Report", reason: "Key not returned after checkout", staff: "Reception" },
    ],
    complaints: [
      {
        id: "CMP-18",
        department: "Restaurant",
        guest: "Tariro Moyo",
        issue: "Breakfast service delayed by 12 minutes.",
        status: "Manager Review",
      },
      {
        id: "CMP-19",
        department: "Activities",
        guest: "Nyasha Chikafu",
        issue: "Zipline queue order disputed by participant.",
        status: "Logged",
      },
    ],
    safetyIncidents: [
      {
        id: "INC-1",
        activity: "Quad Bike",
        participantName: "Tawanda Moyo",
        operatorName: "Tawanda",
        date: "Jul 01",
        time: "11:20",
        natureOfInjury: "Bruising",
        firstAidProvided: true,
        ambulanceCalled: false,
        etdPerformed: false,
        causeOfIncident: "Rider lost balance on a loose gravel bend and fell from the quad bike at low speed.",
        actionTaken: "First aid applied to the forearm, rider rested for 20 minutes and was cleared to continue by the instructor.",
        witnessName: "Chipo",
        status: "Manager Review",
      },
      {
        id: "INC-2",
        activity: "Zipline",
        participantName: "Blessing Ncube",
        operatorName: "Chipo",
        date: "Jun 28",
        time: "15:05",
        natureOfInjury: "Sprain/Strain",
        firstAidProvided: true,
        ambulanceCalled: false,
        etdPerformed: false,
        causeOfIncident: "Participant landed awkwardly on the platform and twisted an ankle.",
        actionTaken: "Ice pack applied, participant escorted to reception, safety report filed and reviewed same day.",
        witnessName: "Tawanda",
        status: "Resolved",
      },
    ],
    cashRegisters: [
      { id: "CASH-1", area: "Reception", businessDate: businessDateIso, openingFloat: 200, cashPaidOut: 0, refunds: 0, status: "Trading" },
      { id: "CASH-2", area: "Restaurant", businessDate: businessDateIso, openingFloat: 100, cashPaidOut: 15, refunds: 0, status: "Trading" },
      { id: "CASH-3", area: "Bar", businessDate: businessDateIso, openingFloat: 100, cashPaidOut: 0, refunds: 0, status: "Trading" },
      { id: "CASH-4", area: "Conference", businessDate: businessDateIso, openingFloat: 50, cashPaidOut: 0, refunds: 0, status: "Trading" },
    ],
    reports: [
      { id: "REP-1", report: "In-house guests by room", schedule: "10:00, 13:00, 17:00, 22:00", status: "Printed" },
      { id: "REP-2", report: "Remaining arrivals and departures", schedule: "Night audit", status: "Ready" },
      { id: "REP-3", report: "Guest balance detailed report", schedule: "Night audit", status: "PDF Saved" },
      { id: "REP-4", report: "Housekeepers room status list", schedule: "Every shift", status: "Ready" },
    ],
    receipts: [
      {
        id: "RCT-1001",
        reservationId: "RSV-1042",
        guest: "Tariro Moyo",
        amount: 330,
        method: "Cash",
        purpose: "Full Settlement",
        balanceAfter: 0,
        issuedBy: "Reception",
        time: "09:05",
      },
      {
        id: "RCT-1002",
        reservationId: "RSV-1043",
        guest: "Blessing Ncube",
        amount: 150,
        method: "Bank Transfer",
        purpose: "Deposit",
        balanceAfter: 180,
        issuedBy: "Reception",
        time: "08:40",
      },
    ],
    expenses: [
      {
        id: "EXP-1",
        category: "Fuel",
        department: "Transport",
        amount: 45,
        supplier: "Puma Zimbabwe",
        approvedBy: "General Manager",
        reference: "FUEL-0702",
        recordedBy: "Finance",
        date: businessDateIso,
        time: "07:40",
      },
      {
        id: "EXP-2",
        category: "Cleaning Materials",
        department: "Housekeeping",
        amount: 32,
        supplier: "Chinda Wholesalers",
        approvedBy: "Front Office Manager",
        reference: "GRN-4471",
        recordedBy: "Finance",
        date: businessDateIso,
        time: "08:15",
      },
    ],
    nightAuditRuns: [],
    businessDay: { date: businessDateIso, status: "Trading" },
    audit: [
      { id: "A1", text: "Reservation RSV-1042 checked in", user: "Reception", time: "09:10" },
      { id: "A2", text: "Kitchen accepted KOT-221", user: "Chef", time: "09:18" },
      { id: "A3", text: "Room Kudu 2 added to housekeeping queue", user: "System", time: "09:22" },
      { id: "A4", text: "Purchase request PR-318 awaiting manager approval", user: "Stores", time: "09:30" },
    ],
    housekeepingChecklists: [createSeedChecklist()],
  };
}

function useLocalDemoState() {
  const [state, setState] = useState<DemoState>(() => {
    const stored = window.localStorage.getItem(storageKey);

    if (!stored) {
      const seed = createSeedState();
      window.localStorage.setItem(storageKey, JSON.stringify(seed));
      return seed;
    }

    try {
      return { ...createSeedState(), ...(JSON.parse(stored) as Partial<DemoState>) };
    } catch {
      return createSeedState();
    }
  });

  const save = (next: DemoState) => {
    setState(next);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
  };

  const withAudit = (next: DemoState, text: string, user = "Demo User") => {
    save({
      ...next,
      audit: [
        { id: crypto.randomUUID(), text, user, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
        ...next.audit,
      ].slice(0, 8),
    });
  };

  return { state, save, withAudit };
}

function App() {
  const [activeModule, setActiveModule] = useState<ModuleId>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { state, save, withAudit } = useLocalDemoState();

  const financeTotals = useMemo(() => computeFinanceTotals(state), [state]);
  const financeAlerts = useMemo(() => computeFinanceAlerts(state), [state]);

  const totals = useMemo(() => {
    const occupied = state.rooms.filter((room) => room.status === "Occupied").length;

    return {
      occupancy: Math.round((occupied / state.rooms.length) * 100),
      arrivals: state.reservations.filter((reservation) => reservation.arrival === tomorrowDateLabel).length,
      revenue: financeTotals.totalRevenue,
      outstanding: financeTotals.outstandingBalance,
    };
  }, [state, financeTotals]);

  const stockAlerts = useMemo(() => computeStockAlerts(getLatestChecklist(state.housekeepingChecklists)), [state.housekeepingChecklists]);

  const dashboardMetrics = useMemo(() => buildDashboardMetrics(state), [state]);

  const resetDemo = () => save(createSeedState());

  const [reservationDrawer, setReservationDrawer] = useState<{ mode: "create" } | { mode: "edit"; id: string } | null>(null);
  const [reservationPrefill, setReservationPrefill] = useState<{ guest?: string; arrival?: string } | null>(null);
  const [checkInReservationId, setCheckInReservationId] = useState<string | null>(null);
  const [checkOutReservationId, setCheckOutReservationId] = useState<string | null>(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [keyModalAction, setKeyModalAction] = useState<KeyLog["action"] | null>(null);
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [receiptPreview, setReceiptPreview] = useState<Receipt | null>(null);
  const [checklistDrawerOpen, setChecklistDrawerOpen] = useState(false);
  const [checklistDetail, setChecklistDetail] = useState<HousekeepingChecklist | null>(null);
  const [activityBookingDrawerOpen, setActivityBookingDrawerOpen] = useState(false);
  const [activityChecklistDrawerOpen, setActivityChecklistDrawerOpen] = useState(false);
  const [safetyIncidentModalOpen, setSafetyIncidentModalOpen] = useState(false);
  const [orderDrawer, setOrderDrawer] = useState<{ initialItem?: string } | null>(null);
  const [kitchenChecklistDrawerOpen, setKitchenChecklistDrawerOpen] = useState(false);
  const [purchaseRequestDrawerOpen, setPurchaseRequestDrawerOpen] = useState(false);
  const [purchaseOrderDrawerRequestId, setPurchaseOrderDrawerRequestId] = useState<string | null>(null);
  const [goodsReceivedOrderId, setGoodsReceivedOrderId] = useState<string | null>(null);
  const [itemDrawerOpen, setItemDrawerOpen] = useState(false);
  const [supplierDrawerOpen, setSupplierDrawerOpen] = useState(false);
  const [stockIssueDrawerOpen, setStockIssueDrawerOpen] = useState(false);
  const [stockTransferDrawerOpen, setStockTransferDrawerOpen] = useState(false);
  const [stockAdjustmentDrawerOpen, setStockAdjustmentDrawerOpen] = useState(false);
  const [stockTakeDrawerOpen, setStockTakeDrawerOpen] = useState(false);
  const [stockTakeDetail, setStockTakeDetail] = useState<StockTake | null>(null);
  const [expenseDrawerOpen, setExpenseDrawerOpen] = useState(false);
  const [cashRegisterModalId, setCashRegisterModalId] = useState<string | null>(null);
  const [nightAuditOpen, setNightAuditOpen] = useState(false);
  const [receivePaymentModalOpen, setReceivePaymentModalOpen] = useState(false);

  const openNewReservation = () => {
    setReservationPrefill(null);
    setReservationDrawer({ mode: "create" });
  };

  const openReservationDrawer = (id: string) => setReservationDrawer({ mode: "edit", id });

  const makeReceipt = (reservation: Reservation, details: { amount: number; method: PaymentMethod; purpose: ReceiptPurpose; balanceAfter: number }): Receipt => ({
    id: `RCT-${1000 + state.receipts.length + Math.floor(Math.random() * 90)}`,
    reservationId: reservation.id,
    guest: reservation.guest,
    amount: details.amount,
    method: details.method,
    purpose: details.purpose,
    balanceAfter: details.balanceAfter,
    issuedBy: "Reception",
    time: nowTime(),
  });

  const saveReservation = (values: ReservationFormValues, existingId: string | null) => {
    if (existingId) {
      withAudit(
        {
          ...state,
          reservations: state.reservations.map((item) =>
            item.id === existingId
              ? {
                  ...item,
                  guest: values.guest,
                  organisation: values.organisation,
                  phone: values.phone || undefined,
                  email: values.email || undefined,
                  room: values.room,
                  arrival: values.arrival,
                  departure: values.departure,
                  guests: values.guests,
                  purpose: values.purpose,
                  rate: values.rate,
                  notes: values.notes || undefined,
                }
              : item,
          ),
        },
        `${existingId} details updated for ${values.guest}`,
        "Reception",
      );
      setReceiptPreview(null);
    } else {
      const id = `RSV-${1000 + state.reservations.length + Math.floor(Math.random() * 50)}`;
      const nights = Math.max(1, dates.indexOf(values.departure) - dates.indexOf(values.arrival));
      const balance = Math.max(0, nights * values.rate - values.depositAmount);
      const newReservation: Reservation = {
        id,
        guest: values.guest,
        organisation: values.organisation,
        phone: values.phone || undefined,
        email: values.email || undefined,
        room: values.room,
        arrival: values.arrival,
        departure: values.departure,
        guests: values.guests,
        status: "Tentative",
        payment: values.depositAmount > 0 ? "Deposit Paid" : "Outstanding",
        balance,
        purpose: values.purpose,
        rate: values.rate,
        notes: values.notes || undefined,
      };
      const receipt = values.depositAmount > 0 ? makeReceipt(newReservation, { amount: values.depositAmount, method: values.paymentMethod, purpose: "Deposit", balanceAfter: balance }) : null;

      withAudit(
        {
          ...state,
          reservations: [newReservation, ...state.reservations],
          receipts: receipt ? [receipt, ...state.receipts] : state.receipts,
        },
        `${id} created for ${values.guest} in room ${values.room}${receipt ? `, deposit receipt ${receipt.id} issued` : ""}`,
        "Reception",
      );
      setReceiptPreview(receipt);
    }

    setReservationDrawer(null);
    setReservationPrefill(null);
  };

  const cancelReservation = (id: string) => {
    withAudit(
      { ...state, reservations: state.reservations.map((item) => (item.id === id ? { ...item, status: "Cancelled" } : item)) },
      `${id} cancelled`,
      "Reception",
    );
    setReservationDrawer(null);
  };

  const extendStay = (id: string, newDeparture: string) => {
    withAudit(
      { ...state, reservations: state.reservations.map((item) => (item.id === id ? { ...item, departure: newDeparture } : item)) },
      `${id} stay extended to depart ${newDeparture}`,
      "Reception",
    );
  };

  const recordPayment = (id: string, details: { amount: number; method: PaymentMethod; purpose: ReceiptPurpose }) => {
    const reservation = state.reservations.find((item) => item.id === id);
    if (!reservation || details.amount <= 0) return;

    const amount = Math.min(details.amount, reservation.balance);
    const balanceAfter = Math.max(0, reservation.balance - amount);
    const receipt = makeReceipt(reservation, { amount, method: details.method, purpose: details.purpose, balanceAfter });

    withAudit(
      {
        ...state,
        reservations: state.reservations.map((item) =>
          item.id === id ? { ...item, balance: balanceAfter, payment: balanceAfter === 0 ? "Paid" : "Deposit Paid" } : item,
        ),
        receipts: [receipt, ...state.receipts],
      },
      `${receipt.id} issued for ${reservation.guest}: ${money.format(amount)} via ${details.method}`,
      "Reception",
    );
    setReservationDrawer(null);
    setReceiptPreview(receipt);
  };

  const confirmCheckIn = (id: string, details: { idNumber: string; vehicle: string; paymentMethod: PaymentMethod; amountReceived: number; signed: boolean }) => {
    const reservation = state.reservations.find((item) => item.id === id);
    if (!reservation) return;

    const amount = Math.max(0, Math.min(details.amountReceived, reservation.balance));
    const balanceAfter = reservation.balance - amount;
    const receipt =
      amount > 0
        ? makeReceipt(reservation, {
            amount,
            method: details.paymentMethod,
            purpose: balanceAfter === 0 ? "Full Settlement" : "Balance Payment",
            balanceAfter,
          })
        : null;

    withAudit(
      {
        ...state,
        reservations: state.reservations.map((item) =>
          item.id === id
            ? {
                ...item,
                status: "Checked In",
                payment: balanceAfter === 0 ? "Paid" : amount > 0 ? "Deposit Paid" : item.payment,
                balance: balanceAfter,
                idNumber: details.idNumber,
                vehicle: details.vehicle,
              }
            : item,
        ),
        rooms: state.rooms.map((room) => (room.number === reservation.room ? { ...room, status: "Occupied" } : room)),
        keyLogs: [
          { id: `KEY-${Math.floor(Math.random() * 900)}`, room: reservation.room, action: "Issued", reason: "Guest check-in", staff: "Reception" },
          ...state.keyLogs,
        ],
        receipts: receipt ? [receipt, ...state.receipts] : state.receipts,
      },
      `${id} checked in (ID ${details.idNumber || "n/a"})${receipt ? `, receipt ${receipt.id} issued for ${money.format(amount)}` : ""} and key issued for room ${reservation.room}`,
      "Reception",
    );
    setCheckInReservationId(null);
    if (receipt) setReceiptPreview(receipt);
  };

  const confirmCheckOut = (id: string, details: { total: number; paymentMethod: PaymentMethod }) => {
    const reservation = state.reservations.find((item) => item.id === id);
    if (!reservation) return;

    const receipt = makeReceipt(reservation, { amount: details.total, method: details.paymentMethod, purpose: "Full Settlement", balanceAfter: 0 });
    const settledAt = nowTime();

    withAudit(
      {
        ...state,
        reservations: state.reservations.map((item) => (item.id === id ? { ...item, status: "Checked Out", payment: "Paid", balance: 0 } : item)),
        rooms: state.rooms.map((room) => (room.number === reservation.room ? { ...room, status: "Dirty" } : room)),
        housekeeping: [
          { id: `HK-${Math.floor(Math.random() * 900)}`, room: reservation.room, assignedTo: "Unassigned", status: "Queued", priority: "High" },
          ...state.housekeeping,
        ],
        keyLogs: [
          { id: `KEY-${Math.floor(Math.random() * 900)}`, room: reservation.room, action: "Returned", reason: "Guest checkout", staff: "Reception" },
          ...state.keyLogs,
        ],
        receipts: [receipt, ...state.receipts],
        orders: state.orders.map((order) =>
          order.guest === reservation.guest && order.payment === "Room Charge" && !order.settledAt ? { ...order, settledAt } : order,
        ),
        activities: state.activities.map((booking) =>
          booking.guest === reservation.guest && booking.payment === "Room Charge" && !booking.settledAt ? { ...booking, settledAt } : booking,
        ),
      },
      `${id} checked out, receipt ${receipt.id} for ${money.format(details.total)} settled via ${details.paymentMethod}, housekeeping notified`,
      "Reception",
    );
    setCheckOutReservationId(null);
    setReceiptPreview(receipt);
  };

  const createEnquiry = (values: { source: Enquiry["source"]; guest: string; request: string; arrival: string; nextStep: string }) => {
    const id = `ENQ-${700 + state.enquiries.length + Math.floor(Math.random() * 90)}`;
    withAudit(
      { ...state, enquiries: [{ id, ...values, status: "New" }, ...state.enquiries] },
      `${id} logged for ${values.guest} via ${values.source}`,
      "Reception",
    );
    setEnquiryModalOpen(false);
  };

  const quoteEnquiry = (id: string) => {
    const enquiry = state.enquiries.find((item) => item.id === id);
    if (!enquiry) return;

    withAudit(
      { ...state, enquiries: state.enquiries.map((item) => (item.id === id ? { ...item, status: "Quoted" } : item)) },
      `${id} quotation generated for ${enquiry.guest}`,
      "Reception",
    );
  };

  const loseEnquiry = (id: string) => {
    withAudit(
      { ...state, enquiries: state.enquiries.map((item) => (item.id === id ? { ...item, status: "Lost" } : item)) },
      `${id} marked as lost`,
      "Reception",
    );
  };

  const convertEnquiry = (id: string) => {
    const enquiry = state.enquiries.find((item) => item.id === id);
    if (!enquiry) return;

    withAudit(
      { ...state, enquiries: state.enquiries.map((item) => (item.id === id ? { ...item, status: "Confirmed" } : item)) },
      `${id} converted to a new reservation`,
      "Reception",
    );
    setReservationPrefill({ guest: enquiry.guest, arrival: enquiry.arrival });
    setReservationDrawer({ mode: "create" });
  };

  const confirmKeyLog = (action: KeyLog["action"], details: { room: string; reason: string; staff: string }) => {
    const id = `KEY-${Math.floor(Math.random() * 900)}`;
    withAudit(
      { ...state, keyLogs: [{ id, room: details.room, action, reason: details.reason, staff: details.staff }, ...state.keyLogs] },
      `${action} for room ${details.room}: ${details.reason}`,
      details.staff,
    );
    setKeyModalAction(null);
  };

  const createMessage = (values: { guest: string; room: string; caller: string; message: string; status: GuestMessage["status"] }) => {
    const id = `MSG-${90 + state.messages.length + Math.floor(Math.random() * 20)}`;
    withAudit(
      { ...state, messages: [{ id, ...values }, ...state.messages] },
      `${id} logged for ${values.guest}`,
      "Reception",
    );
    setMessageModalOpen(false);
  };

  const markMessageDelivered = (id: string) => {
    withAudit(
      { ...state, messages: state.messages.map((item) => (item.id === id ? { ...item, status: "Delivered" } : item)) },
      `${id} delivered to guest`,
      "Reception",
    );
  };

  const createOrder = (values: PosOrderFormValues) => {
    const id = `KOT-${220 + state.orders.length + Math.floor(Math.random() * 90)}`;
    const total = values.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const containsAlcohol = values.items.some((item) => MENU_BY_NAME[item.name]?.category === "Alcohol");
    const newOrder: PosOrder = {
      id,
      table: values.table,
      waiter: values.waiter,
      guest: values.guest,
      items: values.items,
      total,
      payment: values.payment,
      kitchenStatus: "New",
      containsAlcohol,
      ageVerified: containsAlcohol ? values.ageVerified : true,
      placedAt: nowTime(),
      settledAt: values.payment === "Room Charge" ? undefined : nowTime(),
    };

    withAudit(
      { ...state, orders: [newOrder, ...state.orders] },
      `${id} placed for ${values.guest} (${values.table}): ${values.items.map((item) => `${item.quantity}x ${item.name}`).join(", ")}`,
      values.waiter,
    );
    setOrderDrawer(null);
  };

  const saveKitchenChecklist = (values: KitchenChecklistFormValues) => {
    const id = `KC-${Date.now().toString().slice(-6)}`;
    const checklist: KitchenClosingChecklist = {
      id,
      date: values.date,
      submittedBy: values.submittedBy,
      submittedAt: nowTime(),
      fridgeTempC: values.fridgeTempC,
      items: values.items,
      notes: values.notes || undefined,
    };

    const pendingCount = values.items.filter((item) => item.status === "Pending").length;
    const tempWarning = values.fridgeTempC > FRIDGE_SAFE_MAX_C ? `, fridge reading ${values.fridgeTempC}°C is above the safe limit` : "";

    withAudit(
      { ...state, kitchenChecklists: [checklist, ...state.kitchenChecklists] },
      `Kitchen closing checklist submitted by ${values.submittedBy}${pendingCount > 0 ? ` - ${pendingCount} item${pendingCount > 1 ? "s" : ""} still pending` : ""}${tempWarning}`,
      values.submittedBy,
    );
    setKitchenChecklistDrawerOpen(false);
  };

  const advanceKitchen = (id: string) => {
    const order = state.orders.find((item) => item.id === id);
    if (!order) return;

    const nextStatus: Record<KitchenStatus, KitchenStatus> = {
      New: "Preparing",
      Preparing: "Ready",
      Ready: "Completed",
      Completed: "Completed",
    };
    const next = nextStatus[order.kitchenStatus];

    withAudit(
      {
        ...state,
        orders: state.orders.map((item) =>
          item.id === id ? { ...item, kitchenStatus: next, settledAt: next === "Completed" ? nowTime() : item.settledAt } : item,
        ),
      },
      `${id} moved to ${next}`,
      "Kitchen",
    );
  };

  const completeHousekeeping = (id: string) => {
    const task = state.housekeeping.find((item) => item.id === id);
    if (!task) return;

    withAudit(
      {
        ...state,
        housekeeping: state.housekeeping.map((item) => (item.id === id ? { ...item, status: "Available" } : item)),
        rooms: state.rooms.map((room) => (room.number === task.room ? { ...room, status: "Available" } : room)),
      },
      `${task.room} passed inspection and is available`,
      "Housekeeping",
    );
  };

  const saveHousekeepingChecklist = (values: HousekeepingChecklistFormValues) => {
    const id = `HKC-${Date.now().toString().slice(-6)}`;
    const checklist: HousekeepingChecklist = {
      id,
      date: values.date,
      submittedBy: values.submittedBy,
      submittedAt: nowTime(),
      linen: values.linen,
      chemicals: values.chemicals,
      amenities: values.amenities,
      roomStatuses: values.roomStatuses,
      notes: values.notes || undefined,
    };

    const statusByRoom = new Map(values.roomStatuses.map((snapshot) => [snapshot.room, snapshot.status]));

    withAudit(
      {
        ...state,
        housekeepingChecklists: [checklist, ...state.housekeepingChecklists],
        rooms: state.rooms.map((room) => ({
          ...room,
          status: statusByRoom.get(room.number) ?? room.status,
        })),
      },
      `Daily housekeeping checklist submitted for ${formatChecklistDateLabel(values.date)} by ${values.submittedBy}`,
      values.submittedBy,
    );
    setChecklistDrawerOpen(false);
  };

  const createPurchaseRequest = (values: PurchaseRequestFormValues) => {
    const id = `PR-${320 + state.purchaseRequests.length + Math.floor(Math.random() * 90)}`;
    const estimatedTotal = values.items.reduce((sum, item) => sum + item.estimatedCost, 0);
    const newRequest: PurchaseRequest = {
      id,
      department: values.department,
      requestedBy: values.requestedBy,
      requestDate: businessDateLabel,
      priority: values.priority,
      requiredDate: values.requiredDate,
      reason: values.reason,
      items: values.items,
      estimatedTotal,
      status: "Pending Approval",
    };

    withAudit(
      { ...state, purchaseRequests: [newRequest, ...state.purchaseRequests] },
      `${id} raised by ${values.requestedBy} (${values.department}): ${money.format(estimatedTotal)} estimated`,
      values.requestedBy,
    );
    setPurchaseRequestDrawerOpen(false);
  };

  const approvePurchaseRequest = (id: string) => {
    const request = state.purchaseRequests.find((item) => item.id === id);
    if (!request) return;

    withAudit(
      { ...state, purchaseRequests: state.purchaseRequests.map((item) => (item.id === id ? { ...item, status: "Approved" } : item)) },
      `${id} approved for ${request.department}`,
      "Manager",
    );
  };

  const rejectPurchaseRequest = (id: string) => {
    const request = state.purchaseRequests.find((item) => item.id === id);
    if (!request) return;

    withAudit(
      { ...state, purchaseRequests: state.purchaseRequests.map((item) => (item.id === id ? { ...item, status: "Rejected" } : item)) },
      `${id} rejected for ${request.department}`,
      "Manager",
    );
  };

  const createPurchaseOrder = (requestId: string, values: PurchaseOrderFormValues) => {
    const request = state.purchaseRequests.find((item) => item.id === requestId);
    if (!request) return;

    const id = `PO-${900 + state.purchaseOrders.length + Math.floor(Math.random() * 90)}`;
    const items: PurchaseOrderLineItem[] = values.items.map((item) => ({
      itemId: item.itemId,
      description: item.description,
      quantityOrdered: item.quantity,
      quantityReceived: 0,
      unitPrice: item.unitPrice,
    }));
    const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantityOrdered, 0);

    const newOrder: PurchaseOrder = {
      id,
      requestId,
      supplierId: values.supplierId,
      department: request.department,
      issueDate: businessDateLabel,
      deliveryDate: values.deliveryDate,
      requestedBy: request.requestedBy,
      approvedBy: values.approvedBy,
      items,
      total,
      status: "Issued",
      notes: values.notes || undefined,
    };

    withAudit(
      {
        ...state,
        purchaseOrders: [newOrder, ...state.purchaseOrders],
        purchaseRequests: state.purchaseRequests.map((item) => (item.id === requestId ? { ...item, status: "Converted to PO" } : item)),
      },
      `${id} issued from ${requestId}: ${money.format(total)} due ${values.deliveryDate}`,
      values.approvedBy,
    );
    setPurchaseOrderDrawerRequestId(null);
  };

  const cancelPurchaseOrder = (id: string) => {
    const order = state.purchaseOrders.find((item) => item.id === id);
    if (!order || order.status !== "Issued") return;

    withAudit(
      { ...state, purchaseOrders: state.purchaseOrders.map((item) => (item.id === id ? { ...item, status: "Cancelled" } : item)) },
      `${id} cancelled`,
      "Manager",
    );
  };

  const receiveGoods = (poId: string, values: GoodsReceivedFormValues) => {
    const order = state.purchaseOrders.find((item) => item.id === poId);
    if (!order) return;

    const receivedById = new Map(values.items.map((item) => [item.description, item]));
    const updatedItems = order.items.map((line) => {
      const received = receivedById.get(line.description);
      return received
        ? { ...line, quantityReceived: received.quantityReceived, condition: received.condition }
        : line;
    });

    const fullyReceived = updatedItems.every((line) => line.quantityReceived >= line.quantityOrdered);

    const inventoryItems = state.inventoryItems.map((invItem) => {
      const delta = values.items
        .filter((line) => line.itemId === invItem.id)
        .reduce((sum, line) => sum + line.quantityReceived, 0);
      return delta > 0 ? { ...invItem, currentQuantity: invItem.currentQuantity + delta } : invItem;
    });

    withAudit(
      {
        ...state,
        inventoryItems,
        purchaseOrders: state.purchaseOrders.map((item) =>
          item.id === poId
            ? {
                ...item,
                items: updatedItems,
                status: fullyReceived ? "Goods Received" : item.status,
                receivedBy: values.receivedBy,
                receivedDate: businessDateLabel,
                receivingComments: values.comments || undefined,
              }
            : item,
        ),
      },
      `${poId} goods received by ${values.receivedBy}${fullyReceived ? " - fully received" : " - partially received"}, inventory updated`,
      values.receivedBy,
    );
    setGoodsReceivedOrderId(null);
  };

  const createInventoryItem = (values: InventoryItemFormValues) => {
    const id = `ITM-${(100 + state.inventoryItems.length).toString().padStart(3, "0")}`;
    const newItem: InventoryItem = { id, ...values, status: "Active" };

    withAudit(
      { ...state, inventoryItems: [newItem, ...state.inventoryItems] },
      `${id} added to the item master: ${values.name}`,
      "Stores",
    );
    setItemDrawerOpen(false);
  };

  const createSupplier = (values: SupplierFormValues) => {
    const id = `SUP-${4 + state.suppliers.length}`;
    const newSupplier: Supplier = {
      id,
      name: values.name,
      category: values.category,
      contactPerson: values.contactPerson,
      phone: values.phone,
      email: values.email || undefined,
      address: values.address || undefined,
      taxNumber: values.taxNumber || undefined,
      preferred: values.preferred,
      paymentTerms: values.paymentTerms,
      status: "Active",
    };

    withAudit(
      { ...state, suppliers: [newSupplier, ...state.suppliers] },
      `${id} added to suppliers: ${values.name}`,
      "Procurement",
    );
    setSupplierDrawerOpen(false);
  };

  const createStockIssue = (values: StockIssueFormValues) => {
    const item = state.inventoryItems.find((invItem) => invItem.id === values.itemId);
    if (!item) return;

    const id = `SM-${state.stockMovements.length + Math.floor(Math.random() * 900)}`;
    const movement: StockMovement = {
      id,
      type: "Issue",
      itemId: item.id,
      itemName: item.name,
      unit: item.unit,
      quantity: values.quantity,
      department: values.department,
      reason: values.reason,
      requestedBy: values.requestedBy,
      date: businessDateLabel,
      status: "Pending Approval",
    };

    withAudit(
      { ...state, stockMovements: [movement, ...state.stockMovements] },
      `${id} requested: issue ${values.quantity} ${item.unit} of ${item.name} to ${values.department}`,
      values.requestedBy,
    );
    setStockIssueDrawerOpen(false);
  };

  const approveStockIssue = (id: string) => {
    const movement = state.stockMovements.find((item) => item.id === id);
    if (!movement || movement.status !== "Pending Approval") return;
    const item = state.inventoryItems.find((invItem) => invItem.id === movement.itemId);
    if (!item || item.currentQuantity < movement.quantity) return;

    withAudit(
      {
        ...state,
        inventoryItems: state.inventoryItems.map((invItem) =>
          invItem.id === movement.itemId ? { ...invItem, currentQuantity: invItem.currentQuantity - movement.quantity } : invItem,
        ),
        stockMovements: state.stockMovements.map((item2) =>
          item2.id === id ? { ...item2, status: "Completed", approvedBy: "Stores" } : item2,
        ),
      },
      `${id} issued: ${movement.quantity} ${movement.unit} of ${movement.itemName} to ${movement.department}, inventory reduced`,
      "Stores",
    );
  };

  const rejectStockMovement = (id: string) => {
    const movement = state.stockMovements.find((item) => item.id === id);
    if (!movement || movement.status !== "Pending Approval") return;

    withAudit(
      { ...state, stockMovements: state.stockMovements.map((item) => (item.id === id ? { ...item, status: "Rejected" } : item)) },
      `${id} rejected`,
      "Manager",
    );
  };

  const createStockTransfer = (values: StockTransferFormValues) => {
    const item = state.inventoryItems.find((invItem) => invItem.id === values.itemId);
    if (!item) return;

    const id = `SM-${state.stockMovements.length + Math.floor(Math.random() * 900)}`;
    const movement: StockMovement = {
      id,
      type: "Transfer",
      itemId: item.id,
      itemName: item.name,
      unit: item.unit,
      quantity: values.quantity,
      fromLocation: values.fromLocation,
      toLocation: values.toLocation,
      reason: values.reason,
      requestedBy: values.requestedBy,
      date: businessDateLabel,
      status: "Completed",
    };

    withAudit(
      { ...state, stockMovements: [movement, ...state.stockMovements] },
      `${id} transferred ${values.quantity} ${item.unit} of ${item.name} from ${values.fromLocation} to ${values.toLocation}`,
      values.requestedBy,
    );
    setStockTransferDrawerOpen(false);
  };

  const createStockAdjustment = (values: StockAdjustmentFormValues) => {
    const item = state.inventoryItems.find((invItem) => invItem.id === values.itemId);
    if (!item) return;

    const id = `SM-${state.stockMovements.length + Math.floor(Math.random() * 900)}`;
    const movement: StockMovement = {
      id,
      type: "Adjustment",
      itemId: item.id,
      itemName: item.name,
      unit: item.unit,
      quantity: values.quantity,
      adjustmentReason: values.adjustmentReason,
      reason: values.reason,
      requestedBy: values.requestedBy,
      date: businessDateLabel,
      status: "Pending Approval",
    };

    withAudit(
      { ...state, stockMovements: [movement, ...state.stockMovements] },
      `${id} adjustment requested: ${values.quantity > 0 ? "+" : ""}${values.quantity} ${item.unit} of ${item.name} (${values.adjustmentReason})`,
      values.requestedBy,
    );
    setStockAdjustmentDrawerOpen(false);
  };

  const approveStockAdjustment = (id: string) => {
    const movement = state.stockMovements.find((item) => item.id === id);
    if (!movement || movement.status !== "Pending Approval") return;

    withAudit(
      {
        ...state,
        inventoryItems: state.inventoryItems.map((invItem) =>
          invItem.id === movement.itemId ? { ...invItem, currentQuantity: Math.max(0, invItem.currentQuantity + movement.quantity) } : invItem,
        ),
        stockMovements: state.stockMovements.map((item) =>
          item.id === id ? { ...item, status: "Completed", approvedBy: "Manager" } : item,
        ),
      },
      `${id} adjustment approved: ${movement.quantity > 0 ? "+" : ""}${movement.quantity} ${movement.unit} of ${movement.itemName}`,
      "Manager",
    );
  };

  const createStockTake = (values: StockTakeFormValues) => {
    const id = `ST-${state.stockTakes.length + Math.floor(Math.random() * 900)}`;
    const stockTake: StockTake = {
      id,
      date: businessDateLabel,
      countedBy: values.countedBy,
      items: values.items,
      status: "Open",
      notes: values.notes || undefined,
    };

    const varianceCount = values.items.filter((item) => item.countedQuantity !== item.expectedQuantity).length;

    withAudit(
      { ...state, stockTakes: [stockTake, ...state.stockTakes] },
      `${id} stock take submitted by ${values.countedBy}${varianceCount > 0 ? ` - ${varianceCount} item${varianceCount > 1 ? "s" : ""} with variance` : " - no variance"}`,
      values.countedBy,
    );
    setStockTakeDrawerOpen(false);
  };

  const approveStockTake = (id: string) => {
    const stockTake = state.stockTakes.find((item) => item.id === id);
    if (!stockTake || stockTake.status !== "Open") return;

    const countsByItem = new Map(stockTake.items.map((line) => [line.itemId, line.countedQuantity]));

    withAudit(
      {
        ...state,
        inventoryItems: state.inventoryItems.map((invItem) =>
          countsByItem.has(invItem.id) ? { ...invItem, currentQuantity: countsByItem.get(invItem.id)! } : invItem,
        ),
        stockTakes: state.stockTakes.map((item) => (item.id === id ? { ...item, status: "Approved", approvedBy: "Manager" } : item)),
      },
      `${id} approved - inventory reconciled to counted quantities`,
      "Manager",
    );
  };

  const completeManualTask = (id: string) => {
    const task = state.manualTasks.find((item) => item.id === id);
    if (!task) return;

    withAudit(
      {
        ...state,
        manualTasks: state.manualTasks.map((item) => (item.id === id ? { ...item, status: "Done" } : item)),
      },
      `${task.area} checklist item completed: ${task.item}`,
      task.owner,
    );
  };

  const advanceComplaint = (id: string) => {
    const complaint = state.complaints.find((item) => item.id === id);
    if (!complaint) return;

    const nextStatus: Record<Complaint["status"], Complaint["status"]> = {
      Logged: "Manager Review",
      "Manager Review": "Resolved",
      Resolved: "Resolved",
    };

    withAudit(
      {
        ...state,
        complaints: state.complaints.map((item) => (item.id === id ? { ...item, status: nextStatus[item.status] } : item)),
      },
      `${id} moved to ${nextStatus[complaint.status]}`,
      complaint.department,
    );
  };

  const saveActivityBooking = (values: ActivityBookingFormValues) => {
    const id = `ACT-${520 + state.activities.length + Math.floor(Math.random() * 90)}`;
    const newBooking: ActivityBooking = {
      id,
      activity: values.activity,
      guest: values.guest,
      participants: values.participants,
      date: values.date,
      time: values.time,
      instructor: values.instructor,
      status: "Booked",
      price: values.price,
      payment: values.payment,
      settledAt: values.payment === "Room Charge" ? undefined : nowTime(),
      ageConfirmed: values.ageConfirmed,
      guardianPresent: values.guardianPresent,
      weightKg: values.weightKg ? Number(values.weightKg) : undefined,
      medicalClear: values.medicalClear,
      indemnitySigned: values.indemnitySigned,
      notes: values.notes || undefined,
    };

    withAudit(
      { ...state, activities: [newBooking, ...state.activities] },
      `${id} booked for ${values.guest}: ${values.activity} on ${values.date} at ${values.time}`,
      "Activities",
    );
    setActivityBookingDrawerOpen(false);
  };

  const saveActivityChecklist = (values: ActivityChecklistFormValues) => {
    const id = `AC-${Date.now().toString().slice(-6)}`;
    const checklist: ActivityDailyChecklist = {
      id,
      activity: values.activity,
      date: values.date,
      submittedBy: values.submittedBy,
      submittedAt: nowTime(),
      weather: values.weather,
      items: values.items,
      notes: values.notes || undefined,
    };

    const failedItems = values.items.filter((item) => item.status === "Fail").map((item) => item.label);

    withAudit(
      { ...state, activityChecklists: [checklist, ...state.activityChecklists] },
      `${values.activity} pre-use checklist submitted by ${values.submittedBy}${failedItems.length ? ` - FAILED: ${failedItems.join(", ")}` : " - all items passed"}`,
      values.submittedBy,
    );
    setActivityChecklistDrawerOpen(false);
  };

  const saveSafetyIncident = (values: SafetyIncidentFormValues) => {
    const id = `INC-${Date.now().toString().slice(-6)}`;
    const report: SafetyIncidentReport = {
      id,
      activity: values.activity,
      participantName: values.participantName,
      operatorName: values.operatorName,
      date: values.date,
      time: values.time,
      natureOfInjury: values.natureOfInjury,
      firstAidProvided: values.firstAidProvided,
      ambulanceCalled: values.ambulanceCalled,
      etdPerformed: values.etdPerformed,
      causeOfIncident: values.causeOfIncident,
      actionTaken: values.actionTaken,
      witnessName: values.witnessName || undefined,
      status: "Logged",
    };

    withAudit(
      { ...state, safetyIncidents: [report, ...state.safetyIncidents] },
      `${id} safety report filed for ${values.participantName} on ${values.activity} (${values.natureOfInjury})`,
      values.operatorName,
    );
    setSafetyIncidentModalOpen(false);
  };

  const advanceSafetyIncident = (id: string) => {
    const report = state.safetyIncidents.find((item) => item.id === id);
    if (!report) return;

    const nextStatus: Record<SafetyIncidentReport["status"], SafetyIncidentReport["status"]> = {
      Logged: "Manager Review",
      "Manager Review": "Resolved",
      Resolved: "Resolved",
    };

    withAudit(
      {
        ...state,
        safetyIncidents: state.safetyIncidents.map((item) => (item.id === id ? { ...item, status: nextStatus[item.status] } : item)),
      },
      `${id} moved to ${nextStatus[report.status]}`,
      "Manager",
    );
  };

  const markReportPrinted = (id: string) => {
    const report = state.reports.find((item) => item.id === id);
    if (!report) return;

    withAudit(
      {
        ...state,
        reports: state.reports.map((item) => (item.id === id ? { ...item, status: item.status === "Ready" ? "Printed" : "PDF Saved" } : item)),
      },
      `${report.report} generated for department collection`,
      "Night Audit",
    );
  };

  const recordExpense = (values: {
    category: ExpenseCategory;
    department: string;
    amount: number;
    supplier: string;
    approvedBy: string;
    reference: string;
    recordedBy: string;
  }) => {
    if (values.amount <= 0 || !values.approvedBy || !values.recordedBy) return;
    const id = `EXP-${state.expenses.length + 1 + Math.floor(Math.random() * 90)}`;
    const expense: Expense = {
      id,
      category: values.category,
      department: values.department,
      amount: values.amount,
      supplier: values.supplier || undefined,
      approvedBy: values.approvedBy,
      reference: values.reference || undefined,
      recordedBy: values.recordedBy,
      date: businessDateIso,
      time: nowTime(),
    };

    withAudit(
      { ...state, expenses: [expense, ...state.expenses] },
      `${id} recorded: ${values.category} expense of ${money.format(values.amount)} for ${values.department}, approved by ${values.approvedBy}`,
      values.recordedBy,
    );
    setExpenseDrawerOpen(false);
  };

  const countCashRegister = (id: string, actualCash: number, approvedBy: string) => {
    const register = state.cashRegisters.find((item) => item.id === id);
    if (!register) return;

    const expected = computeExpectedCash(state, register);
    const variance = Number((actualCash - expected).toFixed(2));
    const status: CashRegister["status"] = variance === 0 ? "Counted" : approvedBy ? "Variance Approved" : "Counted";

    withAudit(
      {
        ...state,
        cashRegisters: state.cashRegisters.map((item) =>
          item.id === id ? { ...item, actualCash, countedAt: nowTime(), approvedBy: approvedBy || undefined, status } : item,
        ),
      },
      `${register.area} register counted: expected ${money.format(expected)}, actual ${money.format(actualCash)}${
        variance !== 0 ? ` (variance ${money.format(variance)}${approvedBy ? `, approved by ${approvedBy}` : ", awaiting manager approval"})` : ""
      }`,
      "Finance",
    );
    setCashRegisterModalId(null);
  };

  const activeNightAuditRun = state.nightAuditRuns.find((run) => run.businessDate === businessDateIso && run.status === "In Progress") ?? null;

  const startNightAudit = (startedBy: string) => {
    if (state.businessDay.status === "Closed" || activeNightAuditRun || !startedBy) return;
    const id = `NA-${state.nightAuditRuns.length + 1}`;
    const run: NightAuditRun = { id, businessDate: businessDateIso, startedAt: nowTime(), startedBy, completedSteps: [], status: "In Progress" };

    withAudit(
      { ...state, nightAuditRuns: [run, ...state.nightAuditRuns] },
      `Night audit ${id} started by ${startedBy} for business date ${businessDateLabel}`,
      startedBy,
    );
  };

  const toggleNightAuditStep = (runId: string, step: NightAuditStepId) => {
    const run = state.nightAuditRuns.find((item) => item.id === runId);
    if (!run || run.status === "Completed") return;
    const completedSteps = run.completedSteps.includes(step)
      ? run.completedSteps.filter((item) => item !== step)
      : [...run.completedSteps, step];

    withAudit(
      { ...state, nightAuditRuns: state.nightAuditRuns.map((item) => (item.id === runId ? { ...item, completedSteps } : item)) },
      `Night audit ${runId} step "${NIGHT_AUDIT_STEPS.find((item) => item.id === step)?.title ?? step}" ${completedSteps.includes(step) ? "verified" : "unverified"}`,
      "Night Audit",
    );
  };

  const closeBusinessDay = (closedBy: string) => {
    if (state.businessDay.status === "Closed" || !activeNightAuditRun || !closedBy) return;
    const allStepsVerified = NIGHT_AUDIT_STEPS.every((step) => activeNightAuditRun.completedSteps.includes(step.id));
    if (!allStepsVerified) return;

    const openTickets = state.orders.filter((order) => order.kitchenStatus !== "Completed").length;
    const openFolios = state.reservations.filter(
      (reservation) => reservation.departure === businessDateLabel && reservation.status !== "Checked Out" && reservation.status !== "Cancelled",
    ).length;
    const uncountedRegisters = state.cashRegisters.filter((register) => register.actualCash === undefined).length;
    const unresolvedVariances = state.cashRegisters.filter(
      (register) => register.actualCash !== undefined && computeCashVariance(state, register) !== 0 && register.status !== "Variance Approved",
    ).length;

    if (openTickets > 0 || openFolios > 0 || uncountedRegisters > 0 || unresolvedVariances > 0) return;

    withAudit(
      {
        ...state,
        nightAuditRuns: state.nightAuditRuns.map((run) =>
          run.id === activeNightAuditRun.id ? { ...run, status: "Completed", completedAt: nowTime() } : run,
        ),
        businessDay: { date: businessDateIso, status: "Closed", closedAt: nowTime(), closedBy, nightAuditRunId: activeNightAuditRun.id },
      },
      `Business date ${businessDateLabel} closed by ${closedBy}. Night audit ${activeNightAuditRun.id} archived, reports generated, ready to open the next business date.`,
      closedBy,
    );
    setNightAuditOpen(false);
  };

  const searchResults = useMemo(
    () =>
      buildSearchResults(state, searchTerm, {
        goTo: setActiveModule,
        openReservation: openReservationDrawer,
      }),
    [state, searchTerm],
  );

  const activeReservation =
    reservationDrawer?.mode === "edit" ? state.reservations.find((item) => item.id === reservationDrawer.id) ?? null : null;
  const checkInTarget = checkInReservationId ? state.reservations.find((item) => item.id === checkInReservationId) ?? null : null;
  const checkOutTarget = checkOutReservationId ? state.reservations.find((item) => item.id === checkOutReservationId) ?? null : null;

  return (
    <div className="app-shell">
      {sidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />}

      <aside className={sidebarOpen ? "sidebar open" : "sidebar"}>
        <div className="brand">
          <div className="brand-mark">BH</div>
          <div>
            <strong>Blue Hills</strong>
            <span>Hospitality ERP</span>
          </div>
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)} type="button" aria-label="Close navigation menu">
            <X size={18} />
          </button>
        </div>

        <nav className="nav-list">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                className={activeModule === item.id ? "nav-item active" : "nav-item"}
                key={item.id}
                onClick={() => {
                  setActiveModule(item.id);
                  setSidebarOpen(false);
                }}
                type="button"
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="server-card">
          <ShieldCheck size={18} />
          <div>
            <strong>LAN Demo Mode</strong>
            <span>Local storage active</span>
          </div>
        </div>
      </aside>

      <main className="workspace">
        <header className="topbar">
          <button className="menu-toggle" onClick={() => setSidebarOpen(true)} type="button" aria-label="Open navigation menu">
            <Menu size={20} />
          </button>
          <div className="global-search">
            <Search size={18} />
            <input
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search guests, rooms, invoices, purchase orders..."
              value={searchTerm}
            />
            {searchTerm && (
              <div className="search-results">
                {searchResults.length === 0 && <div className="search-empty">No matches found.</div>}
                {searchResults.map((result) => (
                  <button
                    className="search-result"
                    key={result.key}
                    onClick={() => {
                      result.onSelect();
                      setSearchTerm("");
                    }}
                    type="button"
                  >
                    <span className="search-kind">{result.kind}</span>
                    <strong>{result.title}</strong>
                    <span className="search-sub">{result.subtitle}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="topbar-actions">
            <button className="ghost-button" type="button" aria-label={`${state.audit.length} alerts`}>
              <Bell size={17} />
              <span className="label-text">{state.audit.length} Alerts</span>
            </button>
            <button className="ghost-button" type="button" aria-label="Business date: 02 Jul 2026">
              <CalendarDays size={17} />
              <span className="label-text">Business Date: 02 Jul 2026</span>
            </button>
            <button className="primary-button small" onClick={resetDemo} type="button" aria-label="Reset demo data">
              <RotateCcw size={15} />
              <span className="label-text">Reset Demo</span>
            </button>
          </div>
        </header>

        {activeModule === "dashboard" && (
          <Dashboard state={state} totals={totals} stockAlerts={stockAlerts} metrics={dashboardMetrics} financeAlerts={financeAlerts} />
        )}
        {activeModule === "frontOffice" && (
          <FrontOffice
            state={state}
            onOpenReservation={openReservationDrawer}
            onOpenNewReservation={openNewReservation}
            onOpenCheckIn={setCheckInReservationId}
            onOpenCheckOut={setCheckOutReservationId}
            onCompleteManualTask={completeManualTask}
            onOpenNewEnquiry={() => setEnquiryModalOpen(true)}
            onQuoteEnquiry={quoteEnquiry}
            onConvertEnquiry={convertEnquiry}
            onLoseEnquiry={loseEnquiry}
            onOpenKeyModal={setKeyModalAction}
            onOpenNewMessage={() => setMessageModalOpen(true)}
            onMarkMessageDelivered={markMessageDelivered}
            onViewReceipt={setReceiptPreview}
          />
        )}
        {activeModule === "restaurant" && (
          <RestaurantKitchen
            state={state}
            onAdvanceKitchen={advanceKitchen}
            onAdvanceComplaint={advanceComplaint}
            onOpenOrderDrawer={(initialItem) => setOrderDrawer({ initialItem })}
            onOpenKitchenChecklistDrawer={() => setKitchenChecklistDrawerOpen(true)}
          />
        )}
        {activeModule === "operations" && (
          <Operations
            state={state}
            stockAlerts={stockAlerts}
            equipmentAlerts={dashboardMetrics.activityEquipmentAlerts}
            arrivalsAwaitingActivity={dashboardMetrics.arrivalsAwaitingActivity}
            onCompleteHousekeeping={completeHousekeeping}
            onCompleteManualTask={completeManualTask}
            onAdvanceSafetyIncident={advanceSafetyIncident}
            onOpenChecklistDrawer={() => setChecklistDrawerOpen(true)}
            onOpenChecklistDetail={setChecklistDetail}
            onOpenActivityBookingDrawer={() => setActivityBookingDrawerOpen(true)}
            onOpenActivityChecklistDrawer={() => setActivityChecklistDrawerOpen(true)}
            onOpenSafetyIncidentModal={() => setSafetyIncidentModalOpen(true)}
          />
        )}
        {activeModule === "procurement" && (
          <Procurement
            state={state}
            onApproveRequest={approvePurchaseRequest}
            onRejectRequest={rejectPurchaseRequest}
            onOpenRequestDrawer={() => setPurchaseRequestDrawerOpen(true)}
            onOpenPurchaseOrderDrawer={setPurchaseOrderDrawerRequestId}
            onCancelOrder={cancelPurchaseOrder}
            onOpenGoodsReceivedModal={setGoodsReceivedOrderId}
            onOpenItemDrawer={() => setItemDrawerOpen(true)}
            onOpenSupplierDrawer={() => setSupplierDrawerOpen(true)}
            onOpenStockIssueDrawer={() => setStockIssueDrawerOpen(true)}
            onOpenStockTransferDrawer={() => setStockTransferDrawerOpen(true)}
            onOpenStockAdjustmentDrawer={() => setStockAdjustmentDrawerOpen(true)}
            onApproveStockIssue={approveStockIssue}
            onApproveStockAdjustment={approveStockAdjustment}
            onRejectStockMovement={rejectStockMovement}
            onOpenStockTakeDrawer={() => setStockTakeDrawerOpen(true)}
            onApproveStockTake={approveStockTake}
            onOpenStockTakeDetail={setStockTakeDetail}
          />
        )}
        {activeModule === "finance" && (
          <Finance
            state={state}
            financeTotals={financeTotals}
            alerts={financeAlerts}
            onMarkReportPrinted={markReportPrinted}
            onOpenExpenseDrawer={() => setExpenseDrawerOpen(true)}
            onOpenCashRegister={setCashRegisterModalId}
            onOpenNightAudit={() => setNightAuditOpen(true)}
            onOpenReceivePayment={() => setReceivePaymentModalOpen(true)}
          />
        )}
      </main>

      {reservationDrawer && (
        <ReservationDrawer
          onCancelReservation={cancelReservation}
          onClose={() => {
            setReservationDrawer(null);
            setReservationPrefill(null);
          }}
          onExtendStay={extendStay}
          onOpenCheckIn={(id) => {
            setReservationDrawer(null);
            setCheckInReservationId(id);
          }}
          onOpenCheckOut={(id) => {
            setReservationDrawer(null);
            setCheckOutReservationId(id);
          }}
          onRecordPayment={recordPayment}
          onSave={saveReservation}
          state={state}
          prefill={reservationPrefill}
          reservation={activeReservation}
          rooms={state.rooms}
        />
      )}

      {checkInTarget && <CheckInModal onClose={() => setCheckInReservationId(null)} onConfirm={confirmCheckIn} reservation={checkInTarget} />}

      {checkOutTarget && (
        <CheckOutDrawer onClose={() => setCheckOutReservationId(null)} onConfirm={confirmCheckOut} state={state} reservation={checkOutTarget} />
      )}

      {enquiryModalOpen && <EnquiryModal onClose={() => setEnquiryModalOpen(false)} onCreate={createEnquiry} />}

      {keyModalAction && (
        <KeyLogModal action={keyModalAction} onClose={() => setKeyModalAction(null)} onConfirm={(details) => confirmKeyLog(keyModalAction, details)} rooms={state.rooms} />
      )}

      {messageModalOpen && <MessageModal onClose={() => setMessageModalOpen(false)} onCreate={createMessage} />}

      {receiptPreview && <ReceiptModal onClose={() => setReceiptPreview(null)} receipt={receiptPreview} />}

      {checklistDrawerOpen && (
        <HousekeepingChecklistDrawer
          rooms={state.rooms}
          latestChecklist={[...state.housekeepingChecklists].sort((a, b) => b.date.localeCompare(a.date))[0]}
          onClose={() => setChecklistDrawerOpen(false)}
          onSave={saveHousekeepingChecklist}
        />
      )}

      {checklistDetail && <HousekeepingChecklistDetailModal checklist={checklistDetail} onClose={() => setChecklistDetail(null)} />}

      {activityBookingDrawerOpen && (
        <ActivityBookingDrawer onClose={() => setActivityBookingDrawerOpen(false)} onSave={saveActivityBooking} />
      )}

      {activityChecklistDrawerOpen && (
        <ActivityChecklistDrawer onClose={() => setActivityChecklistDrawerOpen(false)} onSave={saveActivityChecklist} />
      )}

      {safetyIncidentModalOpen && (
        <SafetyIncidentModal onClose={() => setSafetyIncidentModalOpen(false)} onSave={saveSafetyIncident} />
      )}

      {orderDrawer && (
        <OrderDrawer initialItem={orderDrawer.initialItem} onClose={() => setOrderDrawer(null)} onSave={createOrder} />
      )}

      {kitchenChecklistDrawerOpen && (
        <KitchenChecklistDrawer onClose={() => setKitchenChecklistDrawerOpen(false)} onSave={saveKitchenChecklist} />
      )}

      {purchaseRequestDrawerOpen && (
        <PurchaseRequestDrawer
          inventoryItems={state.inventoryItems}
          onClose={() => setPurchaseRequestDrawerOpen(false)}
          onSave={createPurchaseRequest}
        />
      )}

      {purchaseOrderDrawerRequestId &&
        (() => {
          const sourceRequest = state.purchaseRequests.find((item) => item.id === purchaseOrderDrawerRequestId);
          return sourceRequest ? (
            <PurchaseOrderDrawer
              request={sourceRequest}
              suppliers={state.suppliers}
              onClose={() => setPurchaseOrderDrawerRequestId(null)}
              onSave={(values) => createPurchaseOrder(sourceRequest.id, values)}
            />
          ) : null;
        })()}

      {goodsReceivedOrderId &&
        (() => {
          const sourceOrder = state.purchaseOrders.find((item) => item.id === goodsReceivedOrderId);
          return sourceOrder ? (
            <GoodsReceivedModal
              order={sourceOrder}
              onClose={() => setGoodsReceivedOrderId(null)}
              onSave={(values) => receiveGoods(sourceOrder.id, values)}
            />
          ) : null;
        })()}

      {itemDrawerOpen && (
        <InventoryItemDrawer suppliers={state.suppliers} onClose={() => setItemDrawerOpen(false)} onSave={createInventoryItem} />
      )}

      {supplierDrawerOpen && <SupplierDrawer onClose={() => setSupplierDrawerOpen(false)} onSave={createSupplier} />}

      {stockIssueDrawerOpen && (
        <StockIssueDrawer inventoryItems={state.inventoryItems} onClose={() => setStockIssueDrawerOpen(false)} onSave={createStockIssue} />
      )}

      {stockTransferDrawerOpen && (
        <StockTransferDrawer inventoryItems={state.inventoryItems} onClose={() => setStockTransferDrawerOpen(false)} onSave={createStockTransfer} />
      )}

      {stockAdjustmentDrawerOpen && (
        <StockAdjustmentDrawer inventoryItems={state.inventoryItems} onClose={() => setStockAdjustmentDrawerOpen(false)} onSave={createStockAdjustment} />
      )}

      {stockTakeDrawerOpen && (
        <StockTakeDrawer inventoryItems={state.inventoryItems} onClose={() => setStockTakeDrawerOpen(false)} onSave={createStockTake} />
      )}

      {stockTakeDetail && <StockTakeDetailModal stockTake={stockTakeDetail} onClose={() => setStockTakeDetail(null)} />}

      {expenseDrawerOpen && <ExpenseDrawer onClose={() => setExpenseDrawerOpen(false)} onSave={recordExpense} />}

      {cashRegisterModalId && (
        <CashRegisterModal
          register={state.cashRegisters.find((item) => item.id === cashRegisterModalId) ?? null}
          expected={
            state.cashRegisters.find((item) => item.id === cashRegisterModalId)
              ? computeExpectedCash(state, state.cashRegisters.find((item) => item.id === cashRegisterModalId)!)
              : 0
          }
          onClose={() => setCashRegisterModalId(null)}
          onSave={countCashRegister}
        />
      )}

      {nightAuditOpen && (
        <NightAuditWizard
          state={state}
          activeRun={activeNightAuditRun}
          onClose={() => setNightAuditOpen(false)}
          onStart={startNightAudit}
          onToggleStep={toggleNightAuditStep}
          onGenerateReports={() => state.reports.filter((report) => report.status === "Ready").forEach((report) => markReportPrinted(report.id))}
          onCloseBusinessDay={closeBusinessDay}
        />
      )}

      {receivePaymentModalOpen && (
        <ReceivePaymentModal reservations={state.reservations.filter((r) => r.balance > 0)} onClose={() => setReceivePaymentModalOpen(false)} onSave={recordPayment} />
      )}
    </div>
  );
}

function Dashboard({
  state,
  totals,
  stockAlerts,
  metrics,
  financeAlerts,
}: {
  state: DemoState;
  totals: { occupancy: number; arrivals: number; revenue: number; outstanding: number };
  stockAlerts: StockAlert[];
  metrics: DashboardMetrics;
  financeAlerts: FinanceAlert[];
}) {
  const attentionItems: Array<{ key: string; icon: LucideIcon; title: string; description: string }> = [...financeAlerts];

  if (metrics.pendingPurchases > 0) {
    const pending = state.purchaseRequests.find((request) => request.status === "Pending Approval");
    attentionItems.push({
      key: "purchase",
      icon: Bell,
      title: `${metrics.pendingPurchases} purchase request${metrics.pendingPurchases > 1 ? "s" : ""} awaiting approval`,
      description: pending ? `${pending.id} - ${pending.reason}` : "Procurement needs manager sign-off.",
    });
  }

  stockAlerts.slice(0, 5).forEach((alert) => {
    attentionItems.push({
      key: `${alert.kind}-${alert.item}`,
      icon: Package,
      title: `${alert.item} ${alert.severity === "danger" ? "critical" : "low stock"}`,
      description: alert.message,
    });
  });

  if (metrics.hkQueueCount > 0) {
    attentionItems.push({
      key: "hk-queue",
      icon: BedDouble,
      title: `${metrics.hkQueueCount} room${metrics.hkQueueCount > 1 ? "s" : ""} in housekeeping queue`,
      description: state.housekeeping
        .filter((task) => task.status !== "Available")
        .map((task) => task.room)
        .join(", "),
    });
  }

  if (!metrics.checklistSubmittedToday) {
    attentionItems.push({
      key: "checklist-missing",
      icon: ClipboardCheck,
      title: "Today's housekeeping checklist not submitted",
      description: metrics.latestChecklist
        ? `Last submitted ${formatChecklistDateLabel(metrics.latestChecklist.date)} by ${metrics.latestChecklist.submittedBy}.`
        : "No checklist history yet.",
    });
  }

  if (metrics.arrivalsToday.length > 0) {
    attentionItems.push({
      key: "arrivals",
      icon: DoorOpen,
      title: `${metrics.arrivalsToday.length} arrival${metrics.arrivalsToday.length > 1 ? "s" : ""} expected today`,
      description: metrics.arrivalsToday.map((reservation) => `${reservation.guest} (${reservation.room})`).join(", "),
    });
  }

  if (metrics.departuresToday.length > 0) {
    attentionItems.push({
      key: "departures",
      icon: LogOut,
      title: `${metrics.departuresToday.length} departure${metrics.departuresToday.length > 1 ? "s" : ""} today`,
      description: metrics.departuresToday.map((reservation) => `${reservation.guest} (${reservation.room})`).join(", "),
    });
  }

  if (metrics.newEnquiries > 0) {
    attentionItems.push({
      key: "enquiries",
      icon: Hotel,
      title: `${metrics.newEnquiries} new enquir${metrics.newEnquiries > 1 ? "ies" : "y"}`,
      description: "Front office follow-up required.",
    });
  }

  if (metrics.pendingMessages > 0) {
    attentionItems.push({
      key: "messages",
      icon: KeyRound,
      title: `${metrics.pendingMessages} guest message${metrics.pendingMessages > 1 ? "s" : ""} pending`,
      description: "Messages not yet delivered to guests.",
    });
  }

  if (metrics.newKitchenOrders > 0) {
    attentionItems.push({
      key: "kitchen",
      icon: ChefHat,
      title: `${metrics.newKitchenOrders} new kitchen order${metrics.newKitchenOrders > 1 ? "s" : ""}`,
      description: state.orders
        .filter((order) => order.kitchenStatus === "New")
        .map((order) => order.id)
        .join(", "),
    });
  }

  if (metrics.activeActivities > 0) {
    attentionItems.push({
      key: "activities",
      icon: Activity,
      title: `${metrics.activeActivities} activit${metrics.activeActivities > 1 ? "ies" : "y"} in progress`,
      description: state.activities
        .filter((booking) => booking.status === "In Progress")
        .map((booking) => booking.activity)
        .join(", "),
    });
  }

  if (metrics.activityEquipmentAlerts.length > 0) {
    attentionItems.push({
      key: "activity-equipment",
      icon: ShieldCheck,
      title: `${metrics.activityEquipmentAlerts.length} activity equipment alert${metrics.activityEquipmentAlerts.length > 1 ? "s" : ""}`,
      description: metrics.activityEquipmentAlerts.map((alert) => `${alert.activity}: ${alert.item}`).join(", "),
    });
  }

  if (metrics.openSafetyIncidents > 0) {
    attentionItems.push({
      key: "safety-incidents",
      icon: ClipboardCheck,
      title: `${metrics.openSafetyIncidents} safety report${metrics.openSafetyIncidents > 1 ? "s" : ""} awaiting review`,
      description: state.safetyIncidents
        .filter((report) => report.status !== "Resolved")
        .map((report) => `${report.id} - ${report.participantName}`)
        .join(", "),
    });
  }

  if (metrics.arrivalsAwaitingActivity.length > 0) {
    attentionItems.push({
      key: "arrivals-no-activity",
      icon: Hotel,
      title: `${metrics.arrivalsAwaitingActivity.length} arrival${metrics.arrivalsAwaitingActivity.length > 1 ? "s" : ""} today with no activity booked`,
      description: metrics.arrivalsAwaitingActivity.map((reservation) => `${reservation.guest} (${reservation.organisation})`).join(", "),
    });
  }

  if (metrics.openComplaints > 0) {
    attentionItems.push({
      key: "open-complaints",
      icon: ClipboardCheck,
      title: `${metrics.openComplaints} guest complaint${metrics.openComplaints > 1 ? "s" : ""} open`,
      description: state.complaints
        .filter((complaint) => complaint.status !== "Resolved")
        .map((complaint) => `${complaint.id} (${complaint.department})`)
        .join(", "),
    });
  }

  if (!metrics.kitchenChecklistSubmittedToday) {
    attentionItems.push({
      key: "kitchen-checklist-missing",
      icon: Utensils,
      title: "Today's kitchen closing checklist not submitted",
      description: metrics.latestKitchenChecklist
        ? `Last submitted ${formatChecklistDateLabel(metrics.latestKitchenChecklist.date)} by ${metrics.latestKitchenChecklist.submittedBy}.`
        : "No checklist history yet.",
    });
  }

  if (metrics.kitchenChecklistAlerts.length > 0) {
    attentionItems.push({
      key: "kitchen-checklist-alerts",
      icon: ShieldCheck,
      title: `${metrics.kitchenChecklistAlerts.length} kitchen closing alert${metrics.kitchenChecklistAlerts.length > 1 ? "s" : ""}`,
      description: metrics.kitchenChecklistAlerts.map((alert) => alert.item).join(", "),
    });
  }

  if (metrics.pendingStockMovements > 0) {
    attentionItems.push({
      key: "pending-stock-movements",
      icon: Package,
      title: `${metrics.pendingStockMovements} stock movement${metrics.pendingStockMovements > 1 ? "s" : ""} awaiting approval`,
      description: state.stockMovements
        .filter((movement) => movement.status === "Pending Approval")
        .map((movement) => `${movement.id} - ${movement.type} of ${movement.itemName}`)
        .join(", "),
    });
  }

  if (metrics.openStockTakesWithVariance > 0) {
    attentionItems.push({
      key: "stock-take-variance",
      icon: Warehouse,
      title: `${metrics.openStockTakesWithVariance} stock take${metrics.openStockTakesWithVariance > 1 ? "s" : ""} with unresolved variance`,
      description: state.stockTakes
        .filter((stockTake) => stockTake.status === "Open" && stockTake.items.some((line) => line.countedQuantity !== line.expectedQuantity))
        .map((stockTake) => `${stockTake.id} counted by ${stockTake.countedBy}`)
        .join(", "),
    });
  }

  return (
    <Page title="Executive Dashboard" description="Live operational picture for Blue Hills Camp." action="Print Manager Pack" icon={Printer}>
      <div className="kpi-grid">
        <KpiCard
          label="Occupancy"
          value={`${totals.occupancy}%`}
          helper={`${metrics.roomSummary.occupied} of ${state.rooms.length} rooms occupied`}
          icon={BedDouble}
          trend={`${metrics.roomSummary.dirty} dirty, ${metrics.roomSummary.available} vacant`}
        />
        <KpiCard
          label="Tomorrow's Arrivals"
          value={totals.arrivals.toString()}
          helper={`${metrics.readyRooms} clean rooms ready now`}
          icon={DoorOpen}
          trend={`${metrics.arrivalsToday.length} arriving today`}
        />
        <KpiCard
          label="Revenue Today"
          value={money.format(totals.revenue)}
          helper="Accommodation, restaurant, activities & conference"
          icon={Receipt}
          trend={`${metrics.inHouseGuests.length} in-house`}
        />
        <KpiCard
          label="Outstanding"
          value={money.format(totals.outstanding)}
          helper="Balances to collect before checkout"
          icon={FileText}
          trend={metrics.departuresToday.length > 0 ? `${metrics.departuresToday.length} departures today` : "No departures today"}
          tone="danger"
        />
        <KpiCard
          label="Activities Today"
          value={metrics.activitiesToday.length.toString()}
          helper={`${money.format(metrics.activitiesRevenueToday)} booked for ${businessDateLabel}`}
          icon={Activity}
          trend={metrics.openSafetyIncidents > 0 ? `${metrics.openSafetyIncidents} safety report${metrics.openSafetyIncidents > 1 ? "s" : ""} open` : "No open safety reports"}
          tone={metrics.activityEquipmentAlerts.length > 0 || metrics.openSafetyIncidents > 0 ? "warning" : undefined}
        />
        <KpiCard
          label="Restaurant Today"
          value={state.orders.length.toString()}
          helper={`${money.format(metrics.restaurantRevenueToday)} in POS sales`}
          icon={Utensils}
          trend={`${metrics.openKitchenTickets} order${metrics.openKitchenTickets === 1 ? "" : "s"} still open`}
          tone={metrics.kitchenChecklistAlerts.length > 0 ? "warning" : undefined}
        />
        <KpiCard
          label="Procurement"
          value={money.format(metrics.procurementSpend)}
          helper={`${metrics.outstandingPOs} purchase order${metrics.outstandingPOs === 1 ? "" : "s"} outstanding`}
          icon={Package}
          trend={`${metrics.pendingPurchases} request${metrics.pendingPurchases === 1 ? "" : "s"} awaiting approval`}
          tone={metrics.pendingPurchases > 0 ? "warning" : undefined}
        />
        <KpiCard
          label="Inventory Value"
          value={money.format(metrics.totalInventoryValue)}
          helper={`${metrics.lowStockCount} item${metrics.lowStockCount === 1 ? "" : "s"} at or below reorder level`}
          icon={Warehouse}
          trend={`${metrics.transfersToday} transfer${metrics.transfersToday === 1 ? "" : "s"} today`}
          tone={metrics.lowStockCount > 0 ? "danger" : undefined}
        />
        <KpiCard
          label="Business Day"
          value={metrics.businessDayClosed ? "Closed" : "Trading"}
          helper={`Expenses today ${money.format(metrics.expensesToday)}`}
          icon={metrics.businessDayClosed ? Lock : Landmark}
          trend={metrics.unresolvedCashVariances > 0 ? `${metrics.unresolvedCashVariances} cash variance(s) unresolved` : "All registers reconciled"}
          tone={metrics.unresolvedCashVariances > 0 ? "danger" : metrics.businessDayClosed ? "success" : undefined}
        />
      </div>

      <div className="content-grid">
        <section className="panel">
          <PanelHeader title="Front Office Today" subtitle={`Business date ${businessDateLabel} - arrivals, in-house guests, and departures.`} />
          <div className="dashboard-summary-grid">
            <article className="summary-stat">
              <span>Arrivals Today</span>
              <strong>{metrics.arrivalsToday.length}</strong>
              <p>{metrics.arrivalsToday.length ? metrics.arrivalsToday.map((reservation) => reservation.guest).join(", ") : "No pending arrivals"}</p>
            </article>
            <article className="summary-stat">
              <span>In-House Guests</span>
              <strong>{metrics.inHouseGuests.length}</strong>
              <p>{metrics.inHouseGuests.length ? metrics.inHouseGuests.map((reservation) => `${reservation.guest} (${reservation.room})`).join(", ") : "No checked-in guests"}</p>
            </article>
            <article className="summary-stat">
              <span>Departures Today</span>
              <strong>{metrics.departuresToday.length}</strong>
              <p>{metrics.departuresToday.length ? metrics.departuresToday.map((reservation) => reservation.guest).join(", ") : "No departures scheduled"}</p>
            </article>
            <article className="summary-stat">
              <span>Front Office Signals</span>
              <strong>{metrics.newEnquiries + metrics.pendingMessages}</strong>
              <p>
                {metrics.newEnquiries} new enquir{metrics.newEnquiries === 1 ? "y" : "ies"}, {metrics.pendingMessages} pending message
                {metrics.pendingMessages === 1 ? "" : "s"}
              </p>
            </article>
          </div>
          {(metrics.arrivalsToday.length > 0 || metrics.inHouseGuests.length > 0) && (
            <table className="stock-table dashboard-table">
              <thead>
                <tr>
                  <th>Guest</th>
                  <th>Room</th>
                  <th>Arrival</th>
                  <th>Departure</th>
                  <th>Status</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {[...metrics.arrivalsToday, ...metrics.inHouseGuests].map((reservation) => (
                  <tr key={reservation.id}>
                    <td>{reservation.guest}</td>
                    <td>{reservation.room}</td>
                    <td>{reservation.arrival}</td>
                    <td>{reservation.departure}</td>
                    <td>
                      <Badge label={reservation.status} />
                    </td>
                    <td>{money.format(reservation.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="panel">
          <PanelHeader title="Housekeeping Snapshot" subtitle="Latest checklist, room readiness, and stock position." />
          <div className="dashboard-summary-grid">
            <article className="summary-stat">
              <span>Latest Checklist</span>
              <strong>{metrics.latestChecklist ? formatChecklistDateLabel(metrics.latestChecklist.date) : "None"}</strong>
              <p>
                {metrics.latestChecklist
                  ? `${metrics.latestChecklist.submittedBy} at ${metrics.latestChecklist.submittedAt}`
                  : "No submissions yet"}
                {metrics.checklistSubmittedToday ? " · Submitted today" : metrics.latestChecklist ? " · Not submitted today" : ""}
              </p>
            </article>
            <article className="summary-stat">
              <span>Rooms to Clean</span>
              <strong>{metrics.dirtyRooms}</strong>
              <p>{metrics.hkQueueCount} in active housekeeping queue</p>
            </article>
            <article className="summary-stat">
              <span>Ready Rooms</span>
              <strong>{metrics.readyRooms}</strong>
              <p>{metrics.roomSummary.staff} staff, {metrics.roomSummary.maintenance} maintenance</p>
            </article>
            <article className="summary-stat">
              <span>Stock Alerts</span>
              <strong>{stockAlerts.length}</strong>
              <p>
                {stockAlerts.filter((alert) => alert.severity === "danger").length} critical, {stockAlerts.filter((alert) => alert.severity === "warning").length} warning
              </p>
            </article>
          </div>
          <table className="stock-table dashboard-table">
            <thead>
              <tr>
                <th>Lodge</th>
                <th>Occupied</th>
                <th>Vacant</th>
                <th>Checkout</th>
                <th>Staff</th>
              </tr>
            </thead>
            <tbody>
              {LODGE_ORDER.map((lodge) => {
                const lodgeSummary = metrics.roomSummary.byLodge[lodge];
                return (
                  <tr key={lodge}>
                    <td>{lodge}</td>
                    <td>{lodgeSummary.occupied}</td>
                    <td>{lodgeSummary.available}</td>
                    <td className={lodgeSummary.dirty > 0 ? "stock-low-cell" : ""}>{lodgeSummary.dirty}</td>
                    <td>{lodgeSummary.staff}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>

      <div className="content-grid">
        <section className="panel wide">
          <PanelHeader title="Occupancy Density Chart" subtitle="Bookings by date with today's operational room status when unbooked." />
          <DensityChart highlightDate={businessDateLabel} rooms={state.rooms} reservations={state.reservations} />
        </section>

        <section className="panel">
          <PanelHeader title="Attention Queue" subtitle="Live front office and housekeeping items needing action." />
          <div className="attention-list">
            {attentionItems.length === 0 ? (
              <p className="muted">No urgent items right now.</p>
            ) : (
              attentionItems.map((item) => <Attention key={item.key} icon={item.icon} title={item.title} description={item.description} />)
            )}
          </div>
        </section>
      </div>

      <section className="panel">
        <PanelHeader title="Recent Audit Trail" subtitle="Every demo action is written back to local storage." />
        <AuditList audit={state.audit} />
      </section>
    </Page>
  );
}

function FrontOffice({
  state,
  onOpenReservation,
  onOpenNewReservation,
  onOpenCheckIn,
  onOpenCheckOut,
  onCompleteManualTask,
  onOpenNewEnquiry,
  onQuoteEnquiry,
  onConvertEnquiry,
  onLoseEnquiry,
  onOpenKeyModal,
  onOpenNewMessage,
  onMarkMessageDelivered,
  onViewReceipt,
}: {
  state: DemoState;
  onOpenReservation: (id: string) => void;
  onOpenNewReservation: () => void;
  onOpenCheckIn: (id: string) => void;
  onOpenCheckOut: (id: string) => void;
  onCompleteManualTask: (id: string) => void;
  onOpenNewEnquiry: () => void;
  onQuoteEnquiry: (id: string) => void;
  onConvertEnquiry: (id: string) => void;
  onLoseEnquiry: (id: string) => void;
  onOpenKeyModal: (action: KeyLog["action"]) => void;
  onOpenNewMessage: () => void;
  onMarkMessageDelivered: (id: string) => void;
  onViewReceipt: (receipt: Receipt) => void;
}) {
  const expectedArrivals = state.reservations.filter((reservation) => ["Tentative", "Confirmed", "Guaranteed"].includes(reservation.status)).length;
  const inHouseGuests = state.reservations
    .filter((reservation) => reservation.status === "Checked In")
    .reduce((sum, reservation) => sum + reservation.guests, 0);
  const followUps = state.enquiries.filter((enquiry) => enquiry.status === "Follow-up" || enquiry.status === "New").length;

  return (
    <Page
      title="Front Office"
      description="Enquiries, reservations, room planning, check-in and check-out."
      action="New Reservation"
      onAction={onOpenNewReservation}
      icon={Hotel}
    >
      <div className="kpi-grid three">
        <KpiCard label="Arrivals" value={expectedArrivals.toString()} helper="Not yet checked in" icon={DoorOpen} />
        <KpiCard label="In-House Guests" value={inHouseGuests.toString()} helper="Including conference group" icon={Home} />
        <KpiCard label="Follow Ups" value={followUps.toString()} helper="Quotations pending response" icon={ClipboardCheck} tone="warning" />
      </div>

      <section className="panel">
        <PanelHeader title="Occupancy Planner" subtitle="Drag and resize will be wired to reservation changes in the full build." />
        <DensityChart rooms={state.rooms} reservations={state.reservations} />
      </section>

      <section className="panel">
        <PanelHeader
          title="Reservation Register"
          subtitle="Digitized version of the front-office density and daily schedule workflow. Click a row to view or edit."
          action={
            <button className="secondary-button" onClick={onOpenNewReservation} type="button">
              <Plus size={16} />
              New Reservation
            </button>
          }
        />
        <table>
          <thead>
            <tr>
              <th>Reservation</th>
              <th>Guest</th>
              <th>Room</th>
              <th>Dates</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Balance</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {state.reservations.map((reservation) => (
              <tr className="clickable-row" key={reservation.id} onClick={() => onOpenReservation(reservation.id)}>
                <td>
                  <strong>{reservation.id}</strong>
                  <span className="muted block">{reservation.organisation}</span>
                </td>
                <td>{reservation.guest}</td>
                <td>{reservation.room}</td>
                <td>
                  {reservation.arrival} - {reservation.departure}
                </td>
                <td>
                  <Badge label={reservation.status} />
                </td>
                <td>
                  <Badge label={reservation.payment} />
                </td>
                <td>{money.format(reservation.balance)}</td>
                <td className="actions-cell">
                  {reservation.status !== "Checked In" && reservation.status !== "Checked Out" && reservation.status !== "Cancelled" && (
                    <button
                      className="secondary-button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onOpenCheckIn(reservation.id);
                      }}
                      type="button"
                    >
                      Check In
                    </button>
                  )}
                  {reservation.status === "Checked In" && (
                    <button
                      className="secondary-button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onOpenCheckOut(reservation.id);
                      }}
                      type="button"
                    >
                      Check Out
                    </button>
                  )}
                  {reservation.balance > 0 && reservation.status !== "Cancelled" && reservation.status !== "Checked Out" && (
                    <button
                      className="ghost-button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onOpenReservation(reservation.id);
                      }}
                      type="button"
                    >
                      Record Payment
                    </button>
                  )}
                  {(reservation.status === "Checked Out" || reservation.status === "Cancelled") && <span className="muted">Closed</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="panel">
        <PanelHeader
          title="Payments & Receipts"
          subtitle="Every deposit, balance payment and settlement issues a numbered receipt for the guest."
        />
        <table>
          <thead>
            <tr>
              <th>Receipt</th>
              <th>Reservation</th>
              <th>Guest</th>
              <th>Purpose</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Balance After</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {state.receipts.map((receipt) => (
              <tr key={receipt.id}>
                <td>{receipt.id}</td>
                <td>{receipt.reservationId}</td>
                <td>{receipt.guest}</td>
                <td>
                  <Badge label={receipt.purpose} />
                </td>
                <td>{money.format(receipt.amount)}</td>
                <td>{receipt.method}</td>
                <td>{money.format(receipt.balanceAfter)}</td>
                <td>
                  <button className="secondary-button" onClick={() => onViewReceipt(receipt)} type="button">
                    View &amp; Print
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="content-grid">
        <section className="panel">
          <PanelHeader
            title="Enquiry & Quotation Desk"
            subtitle="Captures telephone, WhatsApp, email and walk-in leads before reservations."
            action={
              <button className="secondary-button" onClick={onOpenNewEnquiry} type="button">
                <Plus size={16} />
                New Enquiry
              </button>
            }
          />
          <table>
            <thead>
              <tr>
                <th>Enquiry</th>
                <th>Source</th>
                <th>Guest</th>
                <th>Request</th>
                <th>Status</th>
                <th>Next Step</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {state.enquiries.map((enquiry) => (
                <tr key={enquiry.id}>
                  <td>{enquiry.id}</td>
                  <td>{enquiry.source}</td>
                  <td>{enquiry.guest}</td>
                  <td>{enquiry.request}</td>
                  <td>
                    <Badge label={enquiry.status} />
                  </td>
                  <td>{enquiry.nextStep}</td>
                  <td className="actions-cell">
                    {enquiry.status !== "Confirmed" && enquiry.status !== "Lost" && (
                      <>
                        {enquiry.status === "New" && (
                          <button className="secondary-button" onClick={() => onQuoteEnquiry(enquiry.id)} type="button">
                            Quote
                          </button>
                        )}
                        <button className="secondary-button" onClick={() => onConvertEnquiry(enquiry.id)} type="button">
                          Convert
                        </button>
                        <button className="ghost-button" onClick={() => onLoseEnquiry(enquiry.id)} type="button">
                          Mark Lost
                        </button>
                      </>
                    )}
                    {(enquiry.status === "Confirmed" || enquiry.status === "Lost") && <span className="muted">Closed</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="panel">
          <PanelHeader title="Manual Forms & Exceptions" subtitle="Forms and approvals the staff currently manage on paper." />
          <div className="stack">
            {state.manualTasks
              .filter((task) => ["Front Office", "Conference Hall", "Zebra 3"].includes(task.area))
              .map((task) => (
                <ManualTaskCard key={task.id} task={task} onComplete={onCompleteManualTask} />
              ))}
          </div>
        </section>
      </div>

      <div className="content-grid">
        <section className="panel">
          <PanelHeader
            title="Message & Parcel Cards"
            subtitle="Guest messages are held, placed in key boxes, or delivered on arrival."
            action={
              <button className="secondary-button" onClick={onOpenNewMessage} type="button">
                <Plus size={16} />
                New Message
              </button>
            }
          />
          <div className="stack">
            {state.messages.map((message) => (
              <div className="task-card" key={message.id}>
                <div>
                  <strong>
                    {message.guest} - Room {message.room || "TBC"}
                  </strong>
                  <span>
                    {message.caller}: {message.message}
                  </span>
                </div>
                <Badge label={message.status} />
                {message.status !== "Delivered" && (
                  <button className="secondary-button" onClick={() => onMarkMessageDelivered(message.id)} type="button">
                    Mark Delivered
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <PanelHeader title="Key Control Log" subtitle="Tracks issued, returned, spare, missing and broken keys." />
          <div className="button-row">
            <button className="secondary-button" onClick={() => onOpenKeyModal("Issued")} type="button">
              <KeyRound size={16} />
              Issue Key
            </button>
            <button className="secondary-button" onClick={() => onOpenKeyModal("Returned")} type="button">
              Return Key
            </button>
            <button className="secondary-button" onClick={() => onOpenKeyModal("Spare Key Released")} type="button">
              Release Spare
            </button>
            <button className="ghost-button" onClick={() => onOpenKeyModal("Missing Report")} type="button">
              Report Missing
            </button>
          </div>
          <div className="stack">
            {state.keyLogs.map((log) => (
              <div className="task-card" key={log.id}>
                <div>
                  <strong>
                    {log.room} - {log.action}
                  </strong>
                  <span>
                    {log.reason} by {log.staff}
                  </span>
                </div>
                <Badge label={log.action} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </Page>
  );
}

function RestaurantKitchen({
  state,
  onAdvanceKitchen,
  onAdvanceComplaint,
  onOpenOrderDrawer,
  onOpenKitchenChecklistDrawer,
}: {
  state: DemoState;
  onAdvanceKitchen: (id: string) => void;
  onAdvanceComplaint: (id: string) => void;
  onOpenOrderDrawer: (initialItem?: string) => void;
  onOpenKitchenChecklistDrawer: () => void;
}) {
  const latestKitchenChecklist = getLatestKitchenChecklist(state.kitchenChecklists);
  const checklistAlerts = computeKitchenChecklistAlerts(latestKitchenChecklist);
  const checklistSubmittedToday = state.kitchenChecklists.some((checklist) => checklist.date === businessDateIso);

  return (
    <Page
      title="Restaurant & Kitchen"
      description="Touch-friendly POS and kitchen display workflow."
      action="New POS Order"
      onAction={() => onOpenOrderDrawer()}
      icon={ShoppingCart}
    >
      <div className="pos-layout">
        <section className="panel pos-panel">
          <PanelHeader title="Restaurant POS" subtitle="Tap an item to start an order - fast order taking with cash, card, or room charge." />
          <div className="menu-grid">
            {MENU_CATALOG.map((item) => (
              <button className="menu-tile" key={item.name} onClick={() => onOpenOrderDrawer(item.name)} type="button">
                <Utensils size={18} />
                <span>
                  {item.name}
                  <small>{money.format(item.price)}</small>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="panel kitchen-board">
          <PanelHeader title="Kitchen Display" subtitle="Orders move from new to preparing to ready." />
          <div className="ticket-list">
            {state.orders.length === 0 && <p className="muted">No orders yet. Place the first order from the POS.</p>}
            {state.orders.map((order) => (
              <article className="ticket" key={order.id}>
                <div className="ticket-top">
                  <strong>{order.id}</strong>
                  <Badge label={order.kitchenStatus} />
                </div>
                <p>
                  {order.table} - {order.guest}
                </p>
                <ul>
                  {order.items.map((item) => (
                    <li key={item.name}>
                      {item.quantity}x {item.name}
                    </li>
                  ))}
                </ul>
                {order.containsAlcohol && (
                  <p className="muted">{order.ageVerified ? "Age verified at order time" : "Age not verified"}</p>
                )}
                <div className="ticket-footer">
                  <span>{money.format(order.total)}</span>
                  {order.kitchenStatus === "Completed" ? (
                    <Badge label={order.settledAt ? `Settled ${order.settledAt}` : "On Room Account"} />
                  ) : (
                    <button className="primary-button small" onClick={() => onAdvanceKitchen(order.id)} type="button">
                      Advance
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="content-grid">
        <section className="panel">
          <PanelHeader
            title="Kitchen Closing Checklist"
            subtitle="Kitchen closing SOP and dining room open/close (Section F)."
            action={
              <button className="secondary-button" onClick={onOpenKitchenChecklistDrawer} type="button">
                <Plus size={16} />
                New Checklist
              </button>
            }
          />
          {latestKitchenChecklist ? (
            <div className="dashboard-summary-grid">
              <article className="summary-stat">
                <span>Last Submitted</span>
                <strong>{formatChecklistDateLabel(latestKitchenChecklist.date)}</strong>
                <p>
                  {latestKitchenChecklist.submittedBy} at {latestKitchenChecklist.submittedAt}
                  {checklistSubmittedToday ? " - Submitted today" : " - Not submitted today"}
                </p>
              </article>
              <article className="summary-stat">
                <span>Fridge Temperature</span>
                <strong>{latestKitchenChecklist.fridgeTempC}°C</strong>
                <p>{latestKitchenChecklist.fridgeTempC > FRIDGE_SAFE_MAX_C ? `Above the ${FRIDGE_SAFE_MAX_C}°C safe limit` : "Within safe range"}</p>
              </article>
            </div>
          ) : (
            <p className="muted">No closing checklist submitted yet.</p>
          )}
          {checklistAlerts.length > 0 && (
            <div className="attention-list">
              {checklistAlerts.map((alert) => (
                <Attention key={`${alert.section}-${alert.item}`} icon={ClipboardCheck} title={alert.item} description={alert.section} />
              ))}
            </div>
          )}
        </section>

        <section className="panel">
          <PanelHeader title="Guest Complaint Log" subtitle="Manual requires every complaint to be logged, investigated and reported to management." />
          <div className="stack">
            {state.complaints
              .filter((complaint) => complaint.department === "Restaurant")
              .map((complaint) => (
                <div className="task-card" key={complaint.id}>
                  <div>
                    <strong>
                      {complaint.id} - {complaint.guest}
                    </strong>
                    <span>{complaint.issue}</span>
                  </div>
                  <Badge label={complaint.status} />
                  {complaint.status !== "Resolved" && (
                    <button className="secondary-button" onClick={() => onAdvanceComplaint(complaint.id)} type="button">
                      Advance
                    </button>
                  )}
                </div>
              ))}
          </div>
        </section>
      </div>

      <section className="panel">
        <PanelHeader title="Still To Digitize" subtitle="Genuine gaps that remain after order taking and the closing checklist above." />
        <div className="control-grid">
          <ControlCard title="Manager Void Approval" detail="Wrong POS orders must be voided by assistant manager or above - no void flow exists yet." status="Not Wired" />
          <ControlCard title="Bill Folder Settlement Timing" detail="Placed and settled times are now captured per order; the 4-5 minute service standard still isn't measured against a target." status="Partial" />
          <ControlCard title="Breakage Register" detail="Crockery, cutlery and careless breakages must be recorded and reported." status="Missing" />
        </div>
      </section>
    </Page>
  );
}

function Operations({
  state,
  stockAlerts,
  equipmentAlerts,
  arrivalsAwaitingActivity,
  onCompleteHousekeeping,
  onCompleteManualTask,
  onAdvanceSafetyIncident,
  onOpenChecklistDrawer,
  onOpenChecklistDetail,
  onOpenActivityBookingDrawer,
  onOpenActivityChecklistDrawer,
  onOpenSafetyIncidentModal,
}: {
  state: DemoState;
  stockAlerts: StockAlert[];
  equipmentAlerts: ActivityEquipmentAlert[];
  arrivalsAwaitingActivity: Reservation[];
  onCompleteHousekeeping: (id: string) => void;
  onCompleteManualTask: (id: string) => void;
  onAdvanceSafetyIncident: (id: string) => void;
  onOpenChecklistDrawer: () => void;
  onOpenChecklistDetail: (checklist: HousekeepingChecklist) => void;
  onOpenActivityBookingDrawer: () => void;
  onOpenActivityChecklistDrawer: () => void;
  onOpenSafetyIncidentModal: () => void;
}) {
  const roomsByLodge = LODGE_ORDER.map((lodge) => ({
    lodge,
    rooms: state.rooms.filter((room) => room.lodge === lodge),
  }));

  const latestActivityChecklists = getLatestActivityChecklists(state.activityChecklists);

  return (
    <Page
      title="Housekeeping & Activities"
      description="Daily linen, chemical and room checklists with searchable history."
      action="New Daily Checklist"
      onAction={onOpenChecklistDrawer}
      icon={Sparkles}
    >
      <div className="content-grid">
        <section className="panel wide">
          <PanelHeader title="Room Status Board" subtitle="Grouped by lodge. Checkout automatically creates housekeeping work." />
          <div className="lodge-grid">
            {roomsByLodge.map(({ lodge, rooms }) => (
              <div className="lodge-section" key={lodge}>
                <h3 className="lodge-heading">{lodge}</h3>
                <div className="room-grid">
                  {rooms.map((room) => (
                    <div className="room-card" key={room.id}>
                      <div>
                        <strong>{room.number}</strong>
                        <span>{room.type}</span>
                      </div>
                      <Badge label={room.status} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <PanelHeader title="Housekeeping Queue" subtitle="Clean, inspect, and release rooms back to reception." />
          <div className="stack">
            {state.housekeeping.map((task) => (
              <div className="task-card" key={task.id}>
                <div>
                  <strong>{task.room}</strong>
                  <span>
                    {task.assignedTo} - {task.priority}
                  </span>
                </div>
                <Badge label={task.status} />
                {task.status !== "Available" && (
                  <button className="secondary-button" onClick={() => onCompleteHousekeeping(task.id)} type="button">
                    Pass Inspection
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="content-grid">
        <section className="panel">
          <PanelHeader
            title="Daily Checklist History"
            subtitle="Every submission is saved with date, submitter, and full stock counts."
            action={
              <button className="secondary-button" onClick={onOpenChecklistDrawer} type="button">
                New Checklist
              </button>
            }
          />
          {state.housekeepingChecklists.length === 0 ? (
            <p className="muted">No checklists submitted yet. Start today's housekeeping report.</p>
          ) : (
            <table className="stock-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Submitted By</th>
                  <th>Time</th>
                  <th>Rooms</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {[...state.housekeepingChecklists]
                  .sort((a, b) => b.date.localeCompare(a.date))
                  .map((checklist) => (
                    <tr key={checklist.id}>
                      <td>{formatChecklistDateLabel(checklist.date)}</td>
                      <td>{checklist.submittedBy}</td>
                      <td>{checklist.submittedAt}</td>
                      <td>{checklist.roomStatuses.length}</td>
                      <td>
                        <button className="secondary-button" onClick={() => onOpenChecklistDetail(checklist)} type="button">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="panel">
          <PanelHeader title="Stock & Linen Alerts" subtitle="Auto-detected from the latest daily checklist submission." />
          {stockAlerts.length === 0 ? (
            <p className="muted">No stock alerts from the latest checklist.</p>
          ) : (
            <div className="attention-list">
              {stockAlerts.map((alert) => (
                <Attention
                  key={`${alert.kind}-${alert.item}`}
                  icon={Package}
                  title={`${alert.item} (${alert.kind})`}
                  description={alert.message}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {arrivalsAwaitingActivity.length > 0 && (
        <section className="panel">
          <PanelHeader
            title="Front Office Arrivals Awaiting an Activity"
            subtitle="Today's arrival list from Front Office (Section 9.1) - none of these guests have an activity booked yet."
          />
          <div className="attention-list">
            {arrivalsAwaitingActivity.map((reservation) => (
              <Attention
                key={reservation.id}
                icon={DoorOpen}
                title={`${reservation.guest} - ${reservation.organisation}`}
                description={`Room ${reservation.room}, ${reservation.guests} guest${reservation.guests > 1 ? "s" : ""} - offer an activity on check-in`}
              />
            ))}
          </div>
        </section>
      )}

      <section className="panel">
        <PanelHeader
          title="Activities Schedule"
          subtitle="Bookings with instructors, pricing and eligibility accountability."
          action={
            <button className="secondary-button" onClick={onOpenActivityBookingDrawer} type="button">
              <Plus size={16} />
              New Activity Booking
            </button>
          }
        />
        <table>
          <thead>
            <tr>
              <th>Booking</th>
              <th>Activity</th>
              <th>Guest</th>
              <th>Participants</th>
              <th>Date &amp; Time</th>
              <th>Instructor</th>
              <th>Price</th>
              <th>Payment</th>
              <th>Eligibility</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {state.activities.length === 0 && (
              <tr>
                <td colSpan={10}>
                  <p className="muted">No activities booked yet. Create the first booking.</p>
                </td>
              </tr>
            )}
            {state.activities.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.activity}</td>
                <td>{booking.guest}</td>
                <td>{booking.participants}</td>
                <td>
                  {booking.date} - {booking.time}
                </td>
                <td>{booking.instructor}</td>
                <td>{money.format(booking.price)}</td>
                <td>
                  <Badge label={booking.payment === "Room Charge" && !booking.settledAt ? "On Room Account" : "Paid"} />
                </td>
                <td>
                  {booking.ageConfirmed && booking.medicalClear && booking.indemnitySigned ? (
                    <Badge label="Cleared" />
                  ) : (
                    <Badge label="Incomplete" />
                  )}
                </td>
                <td>
                  <Badge label={booking.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="content-grid">
        <section className="panel">
          <PanelHeader
            title="Activity Pre-Use Checklists"
            subtitle="One inspection per activity type before the course opens (Section 3.1, Annex 3 / 6)."
            action={
              <button className="secondary-button" onClick={onOpenActivityChecklistDrawer} type="button">
                <Plus size={16} />
                New Activity Checklist
              </button>
            }
          />
          <div className="stack">
            {ACTIVITY_TYPES.map((activity) => {
              const checklist = latestActivityChecklists[activity];
              if (!checklist) {
                return (
                  <div className="task-card" key={activity}>
                    <div>
                      <strong>{activity}</strong>
                      <span>No checklist submitted yet</span>
                    </div>
                    <Badge label="Missing" />
                  </div>
                );
              }
              const failedCount = checklist.items.filter((item) => item.status === "Fail").length;
              const courseOpen = checklist.weather === "Clear" && failedCount === 0;
              return (
                <div className="task-card" key={activity}>
                  <div>
                    <strong>{activity}</strong>
                    <span>
                      {formatChecklistDateLabel(checklist.date)} by {checklist.submittedBy} - Weather: {checklist.weather}
                    </span>
                    {failedCount > 0 && <small>{failedCount} item{failedCount > 1 ? "s" : ""} failed inspection</small>}
                  </div>
                  <Badge label={courseOpen ? "Course Open" : "Course Closed"} />
                </div>
              );
            })}
          </div>
        </section>

        <section className="panel">
          <PanelHeader title="Equipment Alerts" subtitle="Any item marked Fail on the latest checklist for its activity." />
          {equipmentAlerts.length === 0 ? (
            <p className="muted">No equipment alerts from the latest checklists.</p>
          ) : (
            <div className="attention-list">
              {equipmentAlerts.map((alert) => (
                <Attention
                  key={`${alert.activity}-${alert.item}`}
                  icon={ShieldCheck}
                  title={`${alert.activity}: ${alert.item}`}
                  description={`Failed inspection on ${formatChecklistDateLabel(alert.checklistDate)} - course should stay closed until resolved.`}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      <div className="content-grid">
        <section className="panel">
          <PanelHeader title="Room & Public Area Checklists" subtitle="Chalet, toilet, conference and administration checklist items from the manuals." />
          <div className="stack">
            {state.manualTasks
              .filter((task) => ["Kudu 2"].includes(task.area))
              .map((task) => (
                <ManualTaskCard key={task.id} task={task} onComplete={onCompleteManualTask} />
              ))}
          </div>
        </section>

        <section className="panel">
          <PanelHeader
            title="Safety Incident Reports"
            subtitle="Injuries, near misses and emergency take-downs (Section 3.8, Annex 7)."
            action={
              <button className="secondary-button" onClick={onOpenSafetyIncidentModal} type="button">
                <Plus size={16} />
                New Report
              </button>
            }
          />
          <div className="stack">
            {state.safetyIncidents.length === 0 && <p className="muted">No safety incidents logged.</p>}
            {state.safetyIncidents.map((report) => (
              <div className="task-card" key={report.id}>
                <div>
                  <strong>
                    {report.activity} - {report.natureOfInjury}
                  </strong>
                  <span>
                    {report.participantName} on {report.date} at {report.time} - operator {report.operatorName}
                  </span>
                  <small>{report.causeOfIncident}</small>
                </div>
                <Badge label={report.status} />
                {report.status !== "Resolved" && (
                  <button className="secondary-button" onClick={() => onAdvanceSafetyIncident(report.id)} type="button">
                    Advance
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="panel">
        <PanelHeader title="Still To Digitize" subtitle="Genuine gaps that remain after the checklist, booking and incident workflows above." />
        <div className="control-grid">
          <ControlCard title="Signed Waiver Capture" detail="Indemnity is confirmed by checkbox at booking; a stored signature or photo per Annex 2 / 5 is not yet captured." status="Partial" />
          <ControlCard title="Equipment Asset Register" detail="Checklists log pass/fail per activity, but individual quad bikes and bikes aren't tracked as serialized assets with a maintenance history (Section 5.6 / 8.6)." status="Missing" />
          <ControlCard title="Operator Certification" detail="Instructor is a free-text name; certification status and monthly emergency take-down drills (Section 2) aren't tracked." status="Missing" />
        </div>
      </section>
    </Page>
  );
}

function Procurement({
  state,
  onApproveRequest,
  onRejectRequest,
  onOpenRequestDrawer,
  onOpenPurchaseOrderDrawer,
  onCancelOrder,
  onOpenGoodsReceivedModal,
  onOpenItemDrawer,
  onOpenSupplierDrawer,
  onOpenStockIssueDrawer,
  onOpenStockTransferDrawer,
  onOpenStockAdjustmentDrawer,
  onApproveStockIssue,
  onApproveStockAdjustment,
  onRejectStockMovement,
  onOpenStockTakeDrawer,
  onApproveStockTake,
  onOpenStockTakeDetail,
}: {
  state: DemoState;
  onApproveRequest: (id: string) => void;
  onRejectRequest: (id: string) => void;
  onOpenRequestDrawer: () => void;
  onOpenPurchaseOrderDrawer: (requestId: string) => void;
  onCancelOrder: (id: string) => void;
  onOpenGoodsReceivedModal: (orderId: string) => void;
  onOpenItemDrawer: () => void;
  onOpenSupplierDrawer: () => void;
  onOpenStockIssueDrawer: () => void;
  onOpenStockTransferDrawer: () => void;
  onOpenStockAdjustmentDrawer: () => void;
  onApproveStockIssue: (id: string) => void;
  onApproveStockAdjustment: (id: string) => void;
  onRejectStockMovement: (id: string) => void;
  onOpenStockTakeDrawer: () => void;
  onApproveStockTake: (id: string) => void;
  onOpenStockTakeDetail: (stockTake: StockTake) => void;
}) {
  const lowStockAlerts = computeLowStockAlerts(state.inventoryItems);
  const supplierName = (id: string) => state.suppliers.find((supplier) => supplier.id === id)?.name ?? "Unknown supplier";
  const pendingApprovals = state.purchaseRequests.filter((request) => request.status === "Pending Approval").length;
  const openOrders = state.purchaseOrders.filter((order) => order.status === "Issued").length;
  const pendingMovements = state.stockMovements.filter((movement) => movement.status === "Pending Approval").length;
  const openStockTakes = state.stockTakes.filter((stockTake) => stockTake.status === "Open").length;

  return (
    <Page
      title="Procurement & Stores"
      description="Purchase request to approval, purchase order, goods received, and stock update."
      action="New Purchase Request"
      onAction={onOpenRequestDrawer}
      icon={Package}
    >
      <div className="kpi-grid">
        <KpiCard
          label="Pending Approvals"
          value={pendingApprovals.toString()}
          helper="Requests awaiting a manager"
          icon={ClipboardCheck}
          tone={pendingApprovals > 0 ? "warning" : undefined}
        />
        <KpiCard label="Open Purchase Orders" value={openOrders.toString()} helper="Issued, awaiting delivery" icon={Package} />
        <KpiCard
          label="Low Stock Items"
          value={lowStockAlerts.length.toString()}
          helper="At or below reorder level"
          icon={Warehouse}
          tone={lowStockAlerts.length > 0 ? "danger" : undefined}
        />
      </div>

      <section className="panel">
        <PanelHeader
          title="Purchase Requests"
          subtitle="Department raises a request; a manager approves it before a Purchase Order can be issued."
          action={
            <button className="secondary-button" onClick={onOpenRequestDrawer} type="button">
              <Plus size={16} />
              New Request
            </button>
          }
        />
        <table>
          <thead>
            <tr>
              <th>Request</th>
              <th>Department</th>
              <th>Requested By</th>
              <th>Priority</th>
              <th>Required</th>
              <th>Items</th>
              <th>Est. Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {state.purchaseRequests.length === 0 && (
              <tr>
                <td colSpan={9}>
                  <p className="muted">No purchase requests yet.</p>
                </td>
              </tr>
            )}
            {state.purchaseRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.department}</td>
                <td>{request.requestedBy}</td>
                <td>
                  <Badge label={request.priority} />
                </td>
                <td>{request.requiredDate}</td>
                <td>{request.items.map((item) => item.description).join(", ")}</td>
                <td>{money.format(request.estimatedTotal)}</td>
                <td>
                  <Badge label={request.status} />
                </td>
                <td className="actions-cell">
                  {request.status === "Pending Approval" && (
                    <>
                      <button className="secondary-button" onClick={() => onApproveRequest(request.id)} type="button">
                        Approve
                      </button>
                      <button className="ghost-button" onClick={() => onRejectRequest(request.id)} type="button">
                        Reject
                      </button>
                    </>
                  )}
                  {request.status === "Approved" && (
                    <button className="secondary-button" onClick={() => onOpenPurchaseOrderDrawer(request.id)} type="button">
                      Create Purchase Order
                    </button>
                  )}
                  {(request.status === "Converted to PO" || request.status === "Rejected") && <span className="muted">Closed</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="panel">
        <PanelHeader title="Purchase Orders" subtitle="Issued only from approved requests; goods received updates the item master automatically." />
        <table>
          <thead>
            <tr>
              <th>PO</th>
              <th>Supplier</th>
              <th>Department</th>
              <th>Issued</th>
              <th>Delivery</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {state.purchaseOrders.length === 0 && (
              <tr>
                <td colSpan={8}>
                  <p className="muted">No purchase orders yet.</p>
                </td>
              </tr>
            )}
            {state.purchaseOrders.map((order) => (
              <tr key={order.id}>
                <td>
                  {order.id}
                  <span className="muted block">from {order.requestId}</span>
                </td>
                <td>{supplierName(order.supplierId)}</td>
                <td>{order.department}</td>
                <td>{order.issueDate}</td>
                <td>{order.deliveryDate}</td>
                <td>{money.format(order.total)}</td>
                <td>
                  <Badge label={order.status} />
                </td>
                <td className="actions-cell">
                  {order.status === "Issued" ? (
                    <>
                      <button className="secondary-button" onClick={() => onOpenGoodsReceivedModal(order.id)} type="button">
                        Receive Goods
                      </button>
                      <button className="ghost-button" onClick={() => onCancelOrder(order.id)} type="button">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <span className="muted">{order.status === "Goods Received" ? `Received ${order.receivedDate}` : "Closed"}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="content-grid">
        <section className="panel">
          <PanelHeader
            title="Item Master"
            subtitle="Stock catalog shared across departments."
            action={
              <button className="secondary-button" onClick={onOpenItemDrawer} type="button">
                <Plus size={16} />
                New Item
              </button>
            }
          />
          <table className="stock-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Qty</th>
                <th>Reorder</th>
                <th>Supplier</th>
              </tr>
            </thead>
            <tbody>
              {state.inventoryItems.map((item) => (
                <tr key={item.id} className={item.currentQuantity <= item.reorderLevel ? "stock-low" : ""}>
                  <td>
                    {item.name}
                    <span className="muted block">{item.unit}</span>
                  </td>
                  <td>{item.category}</td>
                  <td className={item.currentQuantity <= item.reorderLevel ? "stock-low-cell" : ""}>{item.currentQuantity}</td>
                  <td>{item.reorderLevel}</td>
                  <td>{supplierName(item.supplierId)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="panel">
          <PanelHeader
            title="Suppliers"
            subtitle="Supplier database for purchase orders."
            action={
              <button className="secondary-button" onClick={onOpenSupplierDrawer} type="button">
                <Plus size={16} />
                New Supplier
              </button>
            }
          />
          <div className="stack">
            {state.suppliers.map((supplier) => (
              <div className="task-card" key={supplier.id}>
                <div>
                  <strong>
                    {supplier.name}
                    {supplier.preferred ? " - Preferred" : ""}
                  </strong>
                  <span>
                    {supplier.category} - {supplier.contactPerson} - {supplier.phone}
                  </span>
                </div>
                <Badge label={supplier.paymentTerms} />
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="panel">
        <PanelHeader title="Low Stock Alerts" subtitle="Computed live from the item master's reorder levels." />
        {lowStockAlerts.length === 0 ? (
          <p className="muted">No items at or below reorder level.</p>
        ) : (
          <div className="attention-list">
            {lowStockAlerts.map((alert) => (
              <Attention
                key={alert.itemId}
                icon={Warehouse}
                title={`${alert.name} ${alert.severity === "danger" ? "critical" : "low"}`}
                description={`${alert.currentQuantity} ${alert.unit} on hand - reorder level is ${alert.reorderLevel} ${alert.unit}`}
              />
            ))}
          </div>
        )}
      </section>

      <section className="panel">
        <PanelHeader
          title="Stock Movements"
          subtitle="Issues, transfers and adjustments - every movement requires a reason."
          action={
            <div className="button-row">
              <button className="secondary-button" onClick={onOpenStockIssueDrawer} type="button">
                <Plus size={16} />
                Issue Stock
              </button>
              <button className="secondary-button" onClick={onOpenStockTransferDrawer} type="button">
                <Plus size={16} />
                Transfer Stock
              </button>
              <button className="secondary-button" onClick={onOpenStockAdjustmentDrawer} type="button">
                <Plus size={16} />
                Adjust Stock
              </button>
            </div>
          }
        />
        <table>
          <thead>
            <tr>
              <th>Movement</th>
              <th>Type</th>
              <th>Item</th>
              <th>Qty</th>
              <th>Detail</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {state.stockMovements.length === 0 && (
              <tr>
                <td colSpan={8}>
                  <p className="muted">No stock movements yet.</p>
                </td>
              </tr>
            )}
            {state.stockMovements.map((movement) => (
              <tr key={movement.id}>
                <td>{movement.id}</td>
                <td>
                  <Badge label={movement.type} />
                </td>
                <td>{movement.itemName}</td>
                <td>
                  {movement.quantity > 0 && movement.type === "Adjustment" ? "+" : ""}
                  {movement.quantity} {movement.unit}
                </td>
                <td>
                  {movement.type === "Issue" && movement.department}
                  {movement.type === "Transfer" && `${movement.fromLocation} to ${movement.toLocation}`}
                  {movement.type === "Adjustment" && movement.adjustmentReason}
                </td>
                <td>{movement.reason}</td>
                <td>
                  <Badge label={movement.status} />
                </td>
                <td className="actions-cell">
                  {movement.status === "Pending Approval" && movement.type === "Issue" && (
                    <>
                      <button className="secondary-button" onClick={() => onApproveStockIssue(movement.id)} type="button">
                        Approve &amp; Issue
                      </button>
                      <button className="ghost-button" onClick={() => onRejectStockMovement(movement.id)} type="button">
                        Reject
                      </button>
                    </>
                  )}
                  {movement.status === "Pending Approval" && movement.type === "Adjustment" && (
                    <>
                      <button className="secondary-button" onClick={() => onApproveStockAdjustment(movement.id)} type="button">
                        Approve
                      </button>
                      <button className="ghost-button" onClick={() => onRejectStockMovement(movement.id)} type="button">
                        Reject
                      </button>
                    </>
                  )}
                  {movement.status !== "Pending Approval" && <span className="muted">Logged</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="panel">
        <PanelHeader
          title="Stock Takes"
          subtitle="Expected vs. counted quantities, with an automatic variance report."
          action={
            <button className="secondary-button" onClick={onOpenStockTakeDrawer} type="button">
              <Plus size={16} />
              New Stock Take
            </button>
          }
        />
        <div className="stack">
          {state.stockTakes.length === 0 && <p className="muted">No stock takes recorded yet.</p>}
          {state.stockTakes.map((stockTake) => {
            const varianceCount = stockTake.items.filter((line) => line.countedQuantity !== line.expectedQuantity).length;
            return (
              <div className="task-card" key={stockTake.id}>
                <div>
                  <strong>
                    {stockTake.id} - {stockTake.date}
                  </strong>
                  <span>
                    Counted by {stockTake.countedBy} - {stockTake.items.length} items
                    {varianceCount > 0 ? `, ${varianceCount} with variance` : ", no variance"}
                  </span>
                </div>
                <Badge label={stockTake.status} />
                <button className="secondary-button" onClick={() => onOpenStockTakeDetail(stockTake)} type="button">
                  View
                </button>
                {stockTake.status === "Open" && (
                  <button className="primary-button small" onClick={() => onApproveStockTake(stockTake.id)} type="button">
                    Approve
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="panel">
        <PanelHeader title="Still To Digitize" subtitle="Genuine gaps that remain after the request-to-stock and movement workflows above." />
        <div className="control-grid">
          <ControlCard
            title="Receipt Upload"
            detail="Supplier receipts (PDF/image) attached directly to a Purchase Order for finance verification."
            status="Missing"
          />
          <ControlCard
            title="Per-Location Balances"
            detail="Transfers are logged for audit but the item master still tracks one aggregate quantity rather than a balance per location."
            status="Partial"
          />
        </div>
      </section>
    </Page>
  );
}

function Finance({
  state,
  financeTotals,
  alerts,
  onMarkReportPrinted,
  onOpenExpenseDrawer,
  onOpenCashRegister,
  onOpenNightAudit,
  onOpenReceivePayment,
}: {
  state: DemoState;
  financeTotals: FinanceTotals;
  alerts: FinanceAlert[];
  onMarkReportPrinted: (id: string) => void;
  onOpenExpenseDrawer: () => void;
  onOpenCashRegister: (id: string) => void;
  onOpenNightAudit: () => void;
  onOpenReceivePayment: () => void;
}) {
  const ledgerReservations = state.reservations.filter((reservation) => {
    if (reservation.status === "Cancelled") return false;
    if (reservation.status === "Checked In") return true;
    if (reservation.status === "Checked Out") return reservation.departure === businessDateLabel;
    return reservation.balance > 0;
  });

  const transactions = [
    ...state.receipts.map((receipt) => ({
      key: receipt.id,
      time: receipt.time,
      description: `${receipt.purpose} - ${receipt.guest}`,
      amount: receipt.amount,
      positive: true,
    })),
    ...state.expenses
      .filter((expense) => expense.date === businessDateIso)
      .map((expense) => ({
        key: expense.id,
        time: expense.time,
        description: `${expense.category} - ${expense.department}`,
        amount: expense.amount,
        positive: false,
      })),
  ].sort((a, b) => b.time.localeCompare(a.time));

  return (
    <Page
      title="Finance & Night Audit"
      description={`Business date ${businessDateLabel} - department revenue, guest ledger, cash reconciliation and business day closure.`}
      action={state.businessDay.status === "Closed" ? "Business Day Closed" : "Night Audit & Close Business Day"}
      onAction={onOpenNightAudit}
      icon={LogOut}
    >
      {alerts.length > 0 && (
        <section className="panel">
          <PanelHeader title="Finance Attention Queue" subtitle="Live checks pulled from every department - nothing here is hardcoded." />
          <div className="stack">
            {alerts.map((alert) => (
              <Attention key={alert.key} icon={alert.icon} title={alert.title} description={alert.description} />
            ))}
          </div>
        </section>
      )}

      <div className="kpi-grid">
        <KpiCard label="Today's Revenue" value={money.format(financeTotals.totalRevenue)} helper="Accommodation, restaurant, activities & conference" icon={TrendingUp} />
        <KpiCard label="Cash Received" value={money.format(financeTotals.cashReceived)} helper="Cash across all outlets" icon={Banknote} />
        <KpiCard label="Card Payments" value={money.format(financeTotals.cardReceived)} helper="Visa / Mastercard" icon={CreditCard} />
        <KpiCard label="Bank & EcoCash" value={money.format(financeTotals.transferReceived + financeTotals.ecocashReceived)} helper="Transfers and EcoCash" icon={Landmark} />
        <KpiCard
          label="Outstanding Balances"
          value={money.format(financeTotals.outstandingBalance)}
          helper="Guest balances still due"
          icon={FileText}
          tone={financeTotals.outstandingBalance > 0 ? "danger" : "success"}
        />
        <KpiCard label="Expenses Today" value={money.format(financeTotals.expensesToday)} helper="Operating costs recorded today" icon={Wallet} tone={financeTotals.expensesToday > 0 ? "warning" : undefined} />
        <KpiCard
          label="Net Revenue"
          value={money.format(financeTotals.netRevenue)}
          helper="Revenue less today's expenses"
          icon={CheckCircle2}
          tone={financeTotals.netRevenue >= 0 ? "success" : "danger"}
        />
        <KpiCard
          label="Cash Variance"
          value={money.format(financeTotals.cashVarianceTotal)}
          helper={financeTotals.unresolvedVarianceCount > 0 ? `${financeTotals.unresolvedVarianceCount} register(s) unresolved` : "All registers reconciled"}
          icon={AlertTriangle}
          tone={financeTotals.unresolvedVarianceCount > 0 ? "danger" : "success"}
        />
      </div>

      <div className="button-row finance-quick-actions">
        <button className="primary-button" onClick={onOpenReceivePayment} type="button">
          <Wallet size={16} />
          Receive Payment
        </button>
        <button className="secondary-button" onClick={onOpenExpenseDrawer} type="button">
          <Receipt size={16} />
          Record Expense
        </button>
        <button className="secondary-button" onClick={onOpenNightAudit} type="button">
          <ClipboardCheck size={16} />
          Night Audit
        </button>
      </div>

      <div className="content-grid">
        <section className="panel">
          <PanelHeader title="Department Revenue" subtitle={`Business date ${businessDateLabel}`} />
          <RevenueBarList
            rows={[
              { label: "Accommodation", value: financeTotals.accommodationRevenue },
              { label: "Restaurant & Bar", value: financeTotals.restaurantRevenue },
              { label: "Activities", value: financeTotals.activitiesRevenue },
              { label: "Conference", value: financeTotals.conferenceRevenue },
            ]}
          />
        </section>
        <section className="panel">
          <PanelHeader title="Payment Methods" subtitle="Collected across all outlets today" />
          <RevenueBarList
            rows={[
              { label: "Cash", value: financeTotals.cashReceived },
              { label: "Card", value: financeTotals.cardReceived },
              { label: "Bank Transfer", value: financeTotals.transferReceived },
              { label: "EcoCash", value: financeTotals.ecocashReceived },
            ]}
          />
        </section>
      </div>

      <section className="panel">
        <PanelHeader title="Guest Ledger" subtitle="Every in-house or owing guest's running account across accommodation, restaurant & bar, and activities." />
        <table>
          <thead>
            <tr>
              <th>Guest</th>
              <th>Room</th>
              <th>Accommodation</th>
              <th>Restaurant &amp; Bar</th>
              <th>Activities</th>
              <th>Total Charges</th>
              <th>Outstanding</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {ledgerReservations.length === 0 && (
              <tr>
                <td colSpan={8} className="muted">
                  No in-house or owing guests right now.
                </td>
              </tr>
            )}
            {ledgerReservations.map((reservation) => {
              const folio = buildGuestFolio(state, reservation);
              const restaurantTotal = folio.lines.filter((line) => line.department === "Restaurant & Bar").reduce((sum, line) => sum + line.amount, 0);
              const activitiesTotal = folio.lines.filter((line) => line.department === "Activities").reduce((sum, line) => sum + line.amount, 0);
              return (
                <tr key={reservation.id}>
                  <td>
                    <strong>{reservation.guest}</strong>
                    <span className="block muted">{reservation.id}</span>
                  </td>
                  <td>{reservation.room}</td>
                  <td>{money.format(folio.accommodationTotal)}</td>
                  <td>{money.format(restaurantTotal)}</td>
                  <td>{money.format(activitiesTotal)}</td>
                  <td>{money.format(folio.totalCharges)}</td>
                  <td>{money.format(folio.totalOutstanding)}</td>
                  <td>
                    <Badge label={folio.totalOutstanding > 0 ? "Outstanding" : "Paid"} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <div className="content-grid">
        <section className="panel">
          <PanelHeader title="Cash Registers" subtitle="Float, expected cash, and variance by outlet - counted at end of shift." />
          <table>
            <thead>
              <tr>
                <th>Area</th>
                <th>Opening Float</th>
                <th>Expected</th>
                <th>Actual</th>
                <th>Variance</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {state.cashRegisters.map((register) => {
                const expected = computeExpectedCash(state, register);
                const variance = computeCashVariance(state, register);
                return (
                  <tr key={register.id}>
                    <td>{register.area}</td>
                    <td>{money.format(register.openingFloat)}</td>
                    <td>{money.format(expected)}</td>
                    <td>{register.actualCash !== undefined ? money.format(register.actualCash) : "Not counted"}</td>
                    <td>{register.actualCash !== undefined ? money.format(variance) : "-"}</td>
                    <td>
                      <Badge label={register.status} />
                    </td>
                    <td>
                      <button className="secondary-button small" onClick={() => onOpenCashRegister(register.id)} type="button">
                        Count Now
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        <section className="panel">
          <PanelHeader title="Recent Transactions" subtitle="Receipts and expenses across every department, most recent first." />
          <div className="stack">
            {transactions.length === 0 && <p className="muted">No transactions recorded yet today.</p>}
            {transactions.map((transaction) => (
              <div className="task-card" key={transaction.key}>
                <div>
                  <strong>{transaction.key}</strong>
                  <span>{transaction.description}</span>
                  <small>{transaction.time}</small>
                </div>
                <strong className={transaction.positive ? "amount-positive" : "amount-negative"}>
                  {transaction.positive ? "+" : "-"}
                  {money.format(transaction.amount)}
                </strong>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="panel">
        <PanelHeader
          title="Expenses"
          subtitle="Daily operating costs by category - fuel, transport, procurement, repairs, cleaning materials, utilities."
          action={
            <button className="secondary-button" onClick={onOpenExpenseDrawer} type="button">
              <Plus size={16} />
              Record Expense
            </button>
          }
        />
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Department</th>
              <th>Amount</th>
              <th>Supplier</th>
              <th>Approved By</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {state.expenses.length === 0 && (
              <tr>
                <td colSpan={7} className="muted">
                  No expenses recorded yet.
                </td>
              </tr>
            )}
            {state.expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.id}</td>
                <td>{expense.category}</td>
                <td>{expense.department}</td>
                <td>{money.format(expense.amount)}</td>
                <td>{expense.supplier ?? "-"}</td>
                <td>{expense.approvedBy}</td>
                <td>{expense.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="panel">
        <PanelHeader title="Reports" subtitle="Printed/PDF reports for front desk, housekeeping, security, kitchen and accounts." />
        <div className="stack">
          {state.reports.map((report) => (
            <div className="task-card" key={report.id}>
              <div>
                <strong>{report.report}</strong>
                <span>{report.schedule}</span>
              </div>
              <Badge label={report.status} />
              <button className="secondary-button" onClick={() => onMarkReportPrinted(report.id)} type="button">
                Generate
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <PanelHeader title="Audit Trail" subtitle="All transactions keep user, time, department, and status history." />
        <AuditList audit={state.audit} />
      </section>

      <section className="panel">
        <PanelHeader title="Not Yet Implemented" subtitle="Manual-required checks that need real backend/hardware support later." />
        <div className="control-grid">
          <ControlCard title="Bill-To-Company Attachments" detail="Company letters and restaurant checks must be attached before reconciliation." status="Missing" />
          <ControlCard title="Credit Card Tips & Paid-Outs" detail="Tips must be separated and paid out with corresponding entries." status="Missing" />
          <ControlCard title="Outlet Settlement Lock" detail="Outlets should stop settling checks while end-of-day is running." status="Backend Needed" />
          <ControlCard title="Printer & Paper Readiness" detail="EOD cannot begin until the printer is connected and loaded." status="Tauri Needed" />
        </div>
      </section>
    </Page>
  );
}

function RevenueBarList({ rows }: { rows: Array<{ label: string; value: number }> }) {
  const max = Math.max(1, ...rows.map((row) => row.value));
  return (
    <div className="revenue-bars">
      {rows.map((row) => (
        <div className="revenue-bar-row" key={row.label}>
          <span>{row.label}</span>
          <div className="revenue-bar-track">
            <div className="revenue-bar-fill" style={{ width: `${Math.round((row.value / max) * 100)}%` }} />
          </div>
          <strong>{money.format(row.value)}</strong>
        </div>
      ))}
    </div>
  );
}

function ExpenseDrawer({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (values: {
    category: ExpenseCategory;
    department: string;
    amount: number;
    supplier: string;
    approvedBy: string;
    reference: string;
    recordedBy: string;
  }) => void;
}) {
  const [category, setCategory] = useState<ExpenseCategory>("Fuel");
  const [department, setDepartment] = useState("");
  const [amount, setAmount] = useState(0);
  const [supplier, setSupplier] = useState("");
  const [approvedBy, setApprovedBy] = useState("");
  const [reference, setReference] = useState("");
  const [recordedBy, setRecordedBy] = useState("Finance");

  return (
    <Drawer title="Record Expense" description="Daily operating costs post against today's business date and reduce net revenue." onClose={onClose}>
      <div className="form-grid">
        <Field label="Category">
          <select value={category} onChange={(event) => setCategory(event.target.value as ExpenseCategory)}>
            {EXPENSE_CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Department">
          <input value={department} onChange={(event) => setDepartment(event.target.value)} placeholder="e.g. Transport, Housekeeping" />
        </Field>
        <Field label="Amount (USD)">
          <input min={0} onChange={(event) => setAmount(Number(event.target.value))} type="number" value={amount} />
        </Field>
        <Field label="Supplier (optional)">
          <input value={supplier} onChange={(event) => setSupplier(event.target.value)} placeholder="e.g. Puma Zimbabwe" />
        </Field>
        <Field label="Approved By">
          <input value={approvedBy} onChange={(event) => setApprovedBy(event.target.value)} placeholder="Manager name" />
        </Field>
        <Field label="Reference (optional)">
          <input value={reference} onChange={(event) => setReference(event.target.value)} placeholder="GRN / invoice number" />
        </Field>
        <Field label="Recorded By">
          <input value={recordedBy} onChange={(event) => setRecordedBy(event.target.value)} />
        </Field>
      </div>
      <div className="sheet-footer">
        <button className="ghost-button" onClick={onClose} type="button">
          Cancel
        </button>
        <button
          className="primary-button"
          disabled={amount <= 0 || !department || !approvedBy || !recordedBy}
          onClick={() => onSave({ category, department, amount, supplier, approvedBy, reference, recordedBy })}
          type="button"
        >
          Record Expense
        </button>
      </div>
    </Drawer>
  );
}

function CashRegisterModal({
  register,
  expected,
  onClose,
  onSave,
}: {
  register: CashRegister | null;
  expected: number;
  onClose: () => void;
  onSave: (id: string, actualCash: number, approvedBy: string) => void;
}) {
  const [actualCash, setActualCash] = useState(register?.actualCash ?? expected);
  const [approvedBy, setApprovedBy] = useState(register?.approvedBy ?? "");

  if (!register) return null;

  const variance = Number((actualCash - expected).toFixed(2));
  const needsApproval = variance !== 0;

  return (
    <Modal title={`Count Register - ${register.area}`} description={`Business date ${businessDateLabel}`} onClose={onClose}>
      <div className="folio-line">
        <span>Opening Float</span>
        <strong>{money.format(register.openingFloat)}</strong>
      </div>
      <div className="folio-line">
        <span>Expected Cash</span>
        <strong>{money.format(expected)}</strong>
      </div>
      <Field label="Actual Cash Counted">
        <input min={0} onChange={(event) => setActualCash(Number(event.target.value))} type="number" value={actualCash} />
      </Field>
      <div className={variance === 0 ? "finding-banner ok" : "finding-banner blocked"}>
        {variance === 0
          ? "Register balances exactly."
          : `Variance of ${money.format(variance)} - a manager must approve before Night Audit can close the day.`}
      </div>
      {needsApproval && (
        <Field label="Variance Approved By (Manager)">
          <input value={approvedBy} onChange={(event) => setApprovedBy(event.target.value)} placeholder="Manager name" />
        </Field>
      )}
      <div className="sheet-footer">
        <button className="ghost-button" onClick={onClose} type="button">
          Cancel
        </button>
        <button className="primary-button" onClick={() => onSave(register.id, actualCash, approvedBy)} type="button">
          Save Count
        </button>
      </div>
    </Modal>
  );
}

function ReceivePaymentModal({
  reservations,
  onClose,
  onSave,
}: {
  reservations: Reservation[];
  onClose: () => void;
  onSave: (id: string, details: { amount: number; method: PaymentMethod; purpose: ReceiptPurpose }) => void;
}) {
  const [reservationId, setReservationId] = useState(reservations[0]?.id ?? "");
  const reservation = reservations.find((item) => item.id === reservationId) ?? null;
  const [amount, setAmount] = useState(reservation?.balance ?? 0);
  const [method, setMethod] = useState<PaymentMethod>("Cash");

  const selectReservation = (id: string) => {
    setReservationId(id);
    setAmount(reservations.find((item) => item.id === id)?.balance ?? 0);
  };

  return (
    <Modal title="Receive Payment" description="Post a payment against a guest's accommodation balance and issue a receipt." onClose={onClose}>
      {reservations.length === 0 ? (
        <p className="muted">No guest currently has an outstanding accommodation balance.</p>
      ) : (
        <>
          <Field label="Guest">
            <select value={reservationId} onChange={(event) => selectReservation(event.target.value)}>
              {reservations.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.guest} - {item.id} (owes {money.format(item.balance)})
                </option>
              ))}
            </select>
          </Field>
          <Field label={`Amount (Balance: ${money.format(reservation?.balance ?? 0)})`}>
            <input min={0} max={reservation?.balance ?? 0} onChange={(event) => setAmount(Number(event.target.value))} type="number" value={amount} />
          </Field>
          <Field label="Payment Method">
            <select value={method} onChange={(event) => setMethod(event.target.value as PaymentMethod)}>
              <option>Cash</option>
              <option>Ecocash</option>
              <option>Bank Transfer</option>
              <option>Card</option>
            </select>
          </Field>
        </>
      )}
      <div className="sheet-footer">
        <button className="ghost-button" onClick={onClose} type="button">
          Cancel
        </button>
        <button
          className="primary-button"
          disabled={!reservation || amount <= 0}
          onClick={() =>
            reservation &&
            onSave(reservation.id, { amount, method, purpose: amount >= reservation.balance ? "Full Settlement" : "Balance Payment" })
          }
          type="button"
        >
          Record Payment &amp; Issue Receipt
        </button>
      </div>
    </Modal>
  );
}

function NightAuditWizard({
  state,
  activeRun,
  onClose,
  onStart,
  onToggleStep,
  onGenerateReports,
  onCloseBusinessDay,
}: {
  state: DemoState;
  activeRun: NightAuditRun | null;
  onClose: () => void;
  onStart: (startedBy: string) => void;
  onToggleStep: (runId: string, step: NightAuditStepId) => void;
  onGenerateReports: () => void;
  onCloseBusinessDay: (closedBy: string) => void;
}) {
  const [startedBy, setStartedBy] = useState("Reception");
  const [closedBy, setClosedBy] = useState("General Manager");

  if (state.businessDay.status === "Closed") {
    return (
      <Modal title="Business Day Closed" description={`Business date ${businessDateLabel}`} onClose={onClose}>
        <p>
          Business date {businessDateLabel} was closed by {state.businessDay.closedBy} at {state.businessDay.closedAt}. All reports are archived in the Reports panel.
        </p>
        <div className="sheet-footer">
          <button className="primary-button" onClick={onClose} type="button">
            Close
          </button>
        </div>
      </Modal>
    );
  }

  const arrivalsToday = state.reservations.filter((reservation) => reservation.arrival === businessDateLabel && reservation.status !== "Cancelled");
  const arrivalsPending = arrivalsToday.filter((reservation) => reservation.status !== "Checked In");
  const departuresToday = state.reservations.filter((reservation) => reservation.departure === businessDateLabel && reservation.status !== "Cancelled");
  const departuresPending = departuresToday.filter((reservation) => reservation.status !== "Checked Out");
  const openTickets = state.orders.filter((order) => order.kitchenStatus !== "Completed");
  const totals = computeFinanceTotals(state);
  const uncountedRegisters = state.cashRegisters.filter((register) => register.actualCash === undefined);
  const unresolvedVariances = state.cashRegisters.filter(
    (register) => register.actualCash !== undefined && computeCashVariance(state, register) !== 0 && register.status !== "Variance Approved",
  );

  if (!activeRun) {
    return (
      <Modal title="Start Night Audit" description={`Business date ${businessDateLabel}`} onClose={onClose}>
        <p>
          Night Audit verifies every department has correctly completed the business day before Finance can close it. Once started, all six checks below must be
          verified before Business Day can close.
        </p>
        {openTickets.length > 0 && (
          <div className="finding-banner blocked">
            {openTickets.length} open restaurant ticket{openTickets.length > 1 ? "s" : ""} on the kitchen display - Night Audit can start, but Restaurant must clear
            before you can close.
          </div>
        )}
        <Field label="Started By">
          <input value={startedBy} onChange={(event) => setStartedBy(event.target.value)} placeholder="Reception / Night Auditor" />
        </Field>
        <div className="sheet-footer">
          <button className="ghost-button" onClick={onClose} type="button">
            Cancel
          </button>
          <button className="primary-button" disabled={!startedBy} onClick={() => onStart(startedBy)} type="button">
            Start Night Audit
          </button>
        </div>
      </Modal>
    );
  }

  const allVerified = NIGHT_AUDIT_STEPS.every((step) => activeRun.completedSteps.includes(step.id));
  const canClose = allVerified && openTickets.length === 0 && departuresPending.length === 0 && uncountedRegisters.length === 0 && unresolvedVariances.length === 0;

  return (
    <Modal
      title={`Night Audit - ${activeRun.id}`}
      description={`Business date ${businessDateLabel}, started by ${activeRun.startedBy} at ${activeRun.startedAt}`}
      onClose={onClose}
      wide
    >
      <div className="wizard-steps">
        {NIGHT_AUDIT_STEPS.map((step) => {
          const done = activeRun.completedSteps.includes(step.id);
          return (
            <div className={`wizard-step ${done ? "done" : ""}`} key={step.id}>
              <div className="wizard-step-head">
                <strong>{step.title}</strong>
                <button className={done ? "secondary-button small" : "primary-button small"} onClick={() => onToggleStep(activeRun.id, step.id)} type="button">
                  {done ? "Verified" : "Verify"}
                </button>
              </div>
              <p className="muted">{step.description}</p>
              {step.id === "arrivals" && (
                <p>
                  {arrivalsPending.length === 0
                    ? `All ${arrivalsToday.length} arrival${arrivalsToday.length === 1 ? "" : "s"} checked in.`
                    : `${arrivalsPending.length} arrival(s) not yet checked in: ${arrivalsPending.map((reservation) => reservation.guest).join(", ")}`}
                </p>
              )}
              {step.id === "checkouts" && (
                <p>
                  {departuresPending.length === 0
                    ? `All ${departuresToday.length} departure${departuresToday.length === 1 ? "" : "s"} checked out.`
                    : `${departuresPending.length} departure(s) still open: ${departuresPending.map((reservation) => reservation.guest).join(", ")}`}
                </p>
              )}
              {step.id === "charges" && (
                <p>
                  Accommodation {money.format(totals.accommodationRevenue + totals.conferenceRevenue)}, Restaurant &amp; Bar{" "}
                  {money.format(totals.restaurantRevenue)}, Activities {money.format(totals.activitiesRevenue)}. Outstanding across all guests:{" "}
                  {money.format(totals.outstandingBalance)}.
                </p>
              )}
              {step.id === "restaurant" && (
                <p>
                  {openTickets.length === 0
                    ? "No open kitchen tickets."
                    : `${openTickets.length} ticket(s) still open: ${openTickets.map((order) => order.id).join(", ")}`}
                </p>
              )}
              {step.id === "cash" && (
                <p>
                  {uncountedRegisters.length === 0 && unresolvedVariances.length === 0
                    ? "All registers counted and balanced."
                    : `${uncountedRegisters.length} register(s) not yet counted, ${unresolvedVariances.length} unresolved variance(s).`}
                </p>
              )}
              {step.id === "reports" && (
                <div className="button-row">
                  <button className="secondary-button small" onClick={onGenerateReports} type="button">
                    Generate All Reports
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={canClose ? "finding-banner ok" : "finding-banner blocked"}>
        {canClose ? "Every check has passed. Business Day is ready to close." : "Resolve the items above before Business Day can close."}
      </div>

      <Field label="Closed By (Manager / Finance Officer)">
        <input value={closedBy} onChange={(event) => setClosedBy(event.target.value)} />
      </Field>

      <div className="sheet-footer">
        <button className="ghost-button" onClick={onClose} type="button">
          Close Wizard
        </button>
        <button className="primary-button" disabled={!canClose || !closedBy} onClick={() => onCloseBusinessDay(closedBy)} type="button">
          <Lock size={16} />
          Close Business Day
        </button>
      </div>
    </Modal>
  );
}

function Page({
  title,
  description,
  action,
  onAction,
  icon: Icon,
  children,
}: {
  title: string;
  description: string;
  action: string;
  onAction?: () => void;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <div className="page">
      <div className="breadcrumb">Dashboard &gt; {title}</div>
      <div className="page-header">
        <div>
          <div className="eyebrow">
            <Icon size={17} />
            Blue Hills Camp
          </div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <button className="primary-button" onClick={onAction} type="button">
          {action}
        </button>
      </div>
      {children}
    </div>
  );
}

function KpiCard({
  label,
  value,
  helper,
  icon: Icon,
  trend,
  tone,
}: {
  label: string;
  value: string;
  helper: string;
  icon: LucideIcon;
  trend?: string;
  tone?: "success" | "warning" | "danger";
}) {
  return (
    <article className={`kpi-card ${tone ?? ""}`}>
      <div className="kpi-icon">
        <Icon size={20} />
      </div>
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{helper}</p>
      {trend && <small>{trend}</small>}
    </article>
  );
}

function ManualTaskCard({ task, onComplete }: { task: ManualTask; onComplete: (id: string) => void }) {
  return (
    <div className="task-card">
      <div>
        <strong>{task.area}</strong>
        <span>{task.item}</span>
        <small>Owner: {task.owner}</small>
      </div>
      <Badge label={task.status} />
      {task.status !== "Done" && (
        <button className="secondary-button" onClick={() => onComplete(task.id)} type="button">
          Mark Done
        </button>
      )}
    </div>
  );
}

function ControlCard({ title, detail, status }: { title: string; detail: string; status: string }) {
  return (
    <article className="control-card">
      <div>
        <strong>{title}</strong>
        <p>{detail}</p>
      </div>
      <Badge label={status} />
    </article>
  );
}

function PanelHeader({ title, subtitle, action }: { title: string; subtitle: string; action?: React.ReactNode }) {
  return (
    <div className="panel-header">
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="form-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function Modal({
  title,
  description,
  onClose,
  children,
  wide,
}: {
  title: string;
  description?: string;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className={`modal-panel ${wide ? "modal-panel-wide" : ""}`} onClick={(event) => event.stopPropagation()}>
        <div className="sheet-header">
          <div>
            <h2>{title}</h2>
            {description && <p>{description}</p>}
          </div>
          <button className="icon-button" onClick={onClose} type="button" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="sheet-body">{children}</div>
      </div>
    </div>
  );
}

function Drawer({
  title,
  description,
  onClose,
  children,
}: {
  title: string;
  description?: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="drawer-panel" onClick={(event) => event.stopPropagation()}>
        <div className="sheet-header">
          <div>
            <h2>{title}</h2>
            {description && <p>{description}</p>}
          </div>
          <button className="icon-button" onClick={onClose} type="button" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="sheet-body">{children}</div>
      </div>
    </div>
  );
}

function ReservationDrawer({
  reservation,
  prefill,
  rooms,
  state,
  onClose,
  onSave,
  onCancelReservation,
  onExtendStay,
  onOpenCheckIn,
  onOpenCheckOut,
  onRecordPayment,
}: {
  reservation: Reservation | null;
  prefill?: { guest?: string; arrival?: string } | null;
  rooms: Room[];
  state: DemoState;
  onClose: () => void;
  onSave: (values: ReservationFormValues, existingId: string | null) => void;
  onCancelReservation: (id: string) => void;
  onExtendStay: (id: string, newDeparture: string) => void;
  onOpenCheckIn: (id: string) => void;
  onOpenCheckOut: (id: string) => void;
  onRecordPayment: (id: string, details: { amount: number; method: PaymentMethod; purpose: ReceiptPurpose }) => void;
}) {
  const [guest, setGuest] = useState(reservation?.guest ?? prefill?.guest ?? "");
  const [organisation, setOrganisation] = useState(reservation?.organisation ?? "");
  const [phone, setPhone] = useState(reservation?.phone ?? "");
  const [email, setEmail] = useState(reservation?.email ?? "");
  const [room, setRoom] = useState(reservation?.room ?? rooms[0]?.number ?? "");
  const [arrival, setArrival] = useState(reservation?.arrival ?? prefill?.arrival ?? dates[0]);
  const [departure, setDeparture] = useState(reservation?.departure ?? dates[1]);
  const [guestCount, setGuestCount] = useState(reservation?.guests ?? 1);
  const [purpose, setPurpose] = useState<Reservation["purpose"]>(reservation?.purpose ?? "Accommodation");
  const [rate, setRate] = useState(reservation?.rate ?? 80);
  const [depositAmount, setDepositAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Cash");
  const [notes, setNotes] = useState(reservation?.notes ?? "");
  const [extendDate, setExtendDate] = useState(reservation?.departure ?? dates[1]);
  const [paymentAmount, setPaymentAmount] = useState(reservation?.balance ?? 0);
  const [paymentMethodForRecord, setPaymentMethodForRecord] = useState<PaymentMethod>("Cash");
  const [paymentPurpose, setPaymentPurpose] = useState<ReceiptPurpose>("Balance Payment");

  const nights = Math.max(1, dates.indexOf(departure) - dates.indexOf(arrival));
  const estimatedTotal = nights * rate;
  const folio = reservation ? buildGuestFolio(state, reservation) : null;

  const canCheckIn = reservation && !["Checked In", "Checked Out", "Cancelled"].includes(reservation.status);
  const canCheckOut = reservation?.status === "Checked In";
  const canCancel = reservation && !["Checked Out", "Cancelled"].includes(reservation.status);

  return (
    <Drawer
      title={reservation ? `${reservation.id} - ${reservation.guest}` : "New Reservation"}
      description={
        reservation
          ? "Reservation details, payment and room allocation."
          : "Capture the guest, dates and room to log a new booking."
      }
      onClose={onClose}
    >
      <div className="form-section">
        <h3>Guest Information</h3>
        <div className="form-grid">
          <Field label="Guest Name">
            <input value={guest} onChange={(event) => setGuest(event.target.value)} placeholder="e.g. Tariro Moyo" />
          </Field>
          <Field label="Organisation / Family">
            <input value={organisation} onChange={(event) => setOrganisation(event.target.value)} placeholder="Optional" />
          </Field>
          <Field label="Phone">
            <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+263 7..." />
          </Field>
          <Field label="Email">
            <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Optional" />
          </Field>
        </div>
      </div>

      <div className="form-section">
        <h3>Accommodation</h3>
        <div className="form-grid">
          <Field label="Room">
            <select value={room} onChange={(event) => setRoom(event.target.value)}>
              {rooms.map((item) => (
                <option key={item.id} value={item.number}>
                  {item.number} - {item.type}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Purpose">
            <select value={purpose} onChange={(event) => setPurpose(event.target.value as Reservation["purpose"])}>
              <option value="Accommodation">Accommodation</option>
              <option value="Conference Group">Conference Group</option>
              <option value="Activities">Activities</option>
            </select>
          </Field>
          <Field label="Arrival Date">
            <select value={arrival} onChange={(event) => setArrival(event.target.value)}>
              {dates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Departure Date">
            <select value={departure} onChange={(event) => setDeparture(event.target.value)}>
              {dates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Number of Guests">
            <input type="number" min={1} value={guestCount} onChange={(event) => setGuestCount(Number(event.target.value))} />
          </Field>
          <Field label="Rate per Night (USD)">
            <input type="number" min={0} value={rate} onChange={(event) => setRate(Number(event.target.value))} />
          </Field>
        </div>
      </div>

      {!reservation && (
        <div className="form-section">
          <h3>Payment</h3>
          <div className="form-grid">
            <Field label="Estimated Total">
              <input disabled value={money.format(estimatedTotal)} />
            </Field>
            <Field label="Deposit Received">
              <input type="number" min={0} value={depositAmount} onChange={(event) => setDepositAmount(Number(event.target.value))} />
            </Field>
            <Field label="Payment Method">
              <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value as PaymentMethod)}>
                <option>Cash</option>
                <option>Ecocash</option>
                <option>Bank Transfer</option>
                <option>Card</option>
              </select>
            </Field>
          </div>
        </div>
      )}

      {reservation && reservation.status !== "Cancelled" && (
        <div className="form-section">
          <h3>Record a Payment</h3>
          <div className="folio-line">
            <span>Outstanding Balance</span>
            <strong>{money.format(reservation.balance)}</strong>
          </div>
          {reservation.balance > 0 ? (
            <>
              <div className="form-grid">
                <Field label="Amount Received">
                  <input
                    max={reservation.balance}
                    min={0}
                    onChange={(event) => setPaymentAmount(Number(event.target.value))}
                    type="number"
                    value={paymentAmount}
                  />
                </Field>
                <Field label="Method">
                  <select onChange={(event) => setPaymentMethodForRecord(event.target.value as PaymentMethod)} value={paymentMethodForRecord}>
                    <option>Cash</option>
                    <option>Ecocash</option>
                    <option>Bank Transfer</option>
                    <option>Card</option>
                  </select>
                </Field>
                <Field label="Purpose">
                  <select onChange={(event) => setPaymentPurpose(event.target.value as ReceiptPurpose)} value={paymentPurpose}>
                    <option value="Deposit">Deposit</option>
                    <option value="Balance Payment">Balance Payment</option>
                    <option value="Full Settlement">Full Settlement</option>
                  </select>
                </Field>
              </div>
              <button
                className="secondary-button"
                disabled={paymentAmount <= 0}
                onClick={() => onRecordPayment(reservation.id, { amount: paymentAmount, method: paymentMethodForRecord, purpose: paymentPurpose })}
                type="button"
              >
                Record Payment &amp; Issue Receipt
              </button>
            </>
          ) : (
            <span className="muted">Account fully settled.</span>
          )}
        </div>
      )}

      <div className="form-section">
        <h3>Notes</h3>
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Special requests, dietary needs, VIP notes..."
          rows={3}
        />
      </div>

      {reservation && folio && (
        <div className="form-section">
          <h3>Guest Folio</h3>
          <div className="stack">
            {folio.lines.map((line) => (
              <div className="task-card" key={line.reference}>
                <div>
                  <strong>
                    {line.reference} - {line.department}
                  </strong>
                  <span>{line.description}</span>
                </div>
                <div>
                  <strong>{money.format(line.amount)}</strong>
                  <Badge label={line.settled ? "Paid" : "Outstanding"} />
                </div>
              </div>
            ))}
          </div>
          <div className="folio-line total">
            <span>Total Outstanding</span>
            <strong>{money.format(folio.totalOutstanding)}</strong>
          </div>
        </div>
      )}

      <div className="sheet-footer">
        <button
          className="primary-button"
          disabled={!guest || !room}
          onClick={() =>
            onSave(
              { guest, organisation, phone, email, room, arrival, departure, guests: guestCount, purpose, rate, depositAmount, paymentMethod, notes },
              reservation?.id ?? null,
            )
          }
          type="button"
        >
          {reservation ? "Save Changes" : "Create Reservation"}
        </button>
        {canCancel && (
          <button className="secondary-button" onClick={() => onCancelReservation(reservation.id)} type="button">
            Cancel Reservation
          </button>
        )}
      </div>

      {reservation && (canCheckIn || canCheckOut) && (
        <div className="form-section">
          <h3>Stay Actions</h3>
          <div className="button-row">
            {canCheckIn && (
              <button className="secondary-button" onClick={() => onOpenCheckIn(reservation.id)} type="button">
                Open Check-In Form
              </button>
            )}
            {canCheckOut && (
              <button className="secondary-button" onClick={() => onOpenCheckOut(reservation.id)} type="button">
                Open Check-Out &amp; Folio
              </button>
            )}
          </div>
        </div>
      )}

      {reservation && canCancel && (
        <div className="form-section">
          <h3>Extend Stay</h3>
          <div className="button-row">
            <select value={extendDate} onChange={(event) => setExtendDate(event.target.value)}>
              {dates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
            <button className="secondary-button" onClick={() => onExtendStay(reservation.id, extendDate)} type="button">
              Extend Stay
            </button>
          </div>
        </div>
      )}
    </Drawer>
  );
}

function CheckInModal({
  reservation,
  onClose,
  onConfirm,
}: {
  reservation: Reservation;
  onClose: () => void;
  onConfirm: (id: string, details: { idNumber: string; vehicle: string; paymentMethod: PaymentMethod; amountReceived: number; signed: boolean }) => void;
}) {
  const [idNumber, setIdNumber] = useState(reservation.idNumber ?? "");
  const [vehicle, setVehicle] = useState(reservation.vehicle ?? "");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Cash");
  const [amountReceived, setAmountReceived] = useState(reservation.balance);
  const [signed, setSigned] = useState(false);

  return (
    <Modal title={`Check In - ${reservation.guest}`} description={`${reservation.id} - Room ${reservation.room}`} onClose={onClose}>
      <div className="form-grid">
        <Field label="ID / Passport Number">
          <input value={idNumber} onChange={(event) => setIdNumber(event.target.value)} placeholder="Required for registration card" />
        </Field>
        <Field label="Vehicle Registration">
          <input value={vehicle} onChange={(event) => setVehicle(event.target.value)} placeholder="Optional" />
        </Field>
        <Field label={`Amount Collected (Balance: ${money.format(reservation.balance)})`}>
          <input
            disabled={reservation.balance === 0}
            max={reservation.balance}
            min={0}
            onChange={(event) => setAmountReceived(Number(event.target.value))}
            type="number"
            value={amountReceived}
          />
        </Field>
        <Field label="Form of Payment">
          <select disabled={amountReceived === 0} onChange={(event) => setPaymentMethod(event.target.value as PaymentMethod)} value={paymentMethod}>
            <option>Cash</option>
            <option>Ecocash</option>
            <option>Bank Transfer</option>
            <option>Card</option>
          </select>
        </Field>
      </div>
      <label className="checkbox-row">
        <input checked={signed} onChange={(event) => setSigned(event.target.checked)} type="checkbox" />
        Guest has signed the registration card
      </label>
      <div className="sheet-footer">
        <button className="ghost-button" onClick={onClose} type="button">
          Cancel
        </button>
        <button
          className="primary-button"
          disabled={!idNumber || !signed}
          onClick={() => onConfirm(reservation.id, { idNumber, vehicle, paymentMethod, amountReceived, signed })}
          type="button"
        >
          Complete Check-In{amountReceived > 0 ? " & Issue Receipt" : " & Issue Key"}
        </button>
      </div>
    </Modal>
  );
}

function CheckOutDrawer({
  reservation,
  state,
  onClose,
  onConfirm,
}: {
  reservation: Reservation;
  state: DemoState;
  onClose: () => void;
  onConfirm: (id: string, details: { total: number; paymentMethod: PaymentMethod }) => void;
}) {
  const folio = buildGuestFolio(state, reservation);
  const [otherCharges, setOtherCharges] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Cash");
  const total = folio.totalOutstanding + otherCharges;

  return (
    <Drawer title={`Check Out - ${reservation.guest}`} description={`${reservation.id} - Room ${reservation.room}`} onClose={onClose}>
      <div className="form-section">
        <h3>Folio Summary</h3>
        <div className="folio-line">
          <span>Accommodation Balance Due</span>
          <strong>{money.format(folio.accommodationOutstanding)}</strong>
        </div>
        <div className="folio-line">
          <span>Restaurant &amp; Bar (room charges)</span>
          <strong>{money.format(folio.restaurantOutstanding)}</strong>
        </div>
        <div className="folio-line">
          <span>Activities (room charges)</span>
          <strong>{money.format(folio.activitiesOutstanding)}</strong>
        </div>
        <div className="folio-line">
          <span>Other Charges (laundry, incidentals, etc.)</span>
          <input type="number" min={0} value={otherCharges} onChange={(event) => setOtherCharges(Number(event.target.value))} />
        </div>
        <div className="folio-line total">
          <span>Total Due</span>
          <strong>{money.format(total)}</strong>
        </div>
      </div>

      <div className="form-section">
        <h3>Settlement</h3>
        <Field label="Payment Method">
          <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value as PaymentMethod)}>
            <option>Cash</option>
            <option>Ecocash</option>
            <option>Bank Transfer</option>
            <option>Card</option>
          </select>
        </Field>
      </div>

      <div className="sheet-footer">
        <button className="primary-button" onClick={() => onConfirm(reservation.id, { total, paymentMethod })} type="button">
          Settle &amp; Print Receipt
        </button>
      </div>
    </Drawer>
  );
}

function EnquiryModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (values: { source: Enquiry["source"]; guest: string; request: string; arrival: string; nextStep: string }) => void;
}) {
  const [source, setSource] = useState<Enquiry["source"]>("Telephone");
  const [guest, setGuest] = useState("");
  const [request, setRequest] = useState("");
  const [arrival, setArrival] = useState(dates[0]);
  const [nextStep, setNextStep] = useState("");

  return (
    <Modal title="New Enquiry" description="Capture telephone, WhatsApp, email or walk-in leads before they become reservations." onClose={onClose}>
      <div className="form-grid">
        <Field label="Source">
          <select value={source} onChange={(event) => setSource(event.target.value as Enquiry["source"])}>
            <option>Telephone</option>
            <option>WhatsApp</option>
            <option>Email</option>
            <option>Walk-in</option>
          </select>
        </Field>
        <Field label="Guest / Organisation">
          <input value={guest} onChange={(event) => setGuest(event.target.value)} placeholder="Guest name" />
        </Field>
        <Field label="Requested Arrival">
          <select value={arrival} onChange={(event) => setArrival(event.target.value)}>
            {dates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Follow-up / Next Step">
          <input value={nextStep} onChange={(event) => setNextStep(event.target.value)} placeholder="e.g. Call back tomorrow" />
        </Field>
      </div>
      <Field label="Request Details">
        <textarea value={request} onChange={(event) => setRequest(event.target.value)} rows={3} placeholder="Accommodation, activities, conference, special requests" />
      </Field>
      <div className="sheet-footer">
        <button className="ghost-button" onClick={onClose} type="button">
          Cancel
        </button>
        <button
          className="primary-button"
          disabled={!guest || !request}
          onClick={() => onCreate({ source, guest, request, arrival, nextStep: nextStep || "Awaiting first follow-up" })}
          type="button"
        >
          Save Enquiry
        </button>
      </div>
    </Modal>
  );
}

function KeyLogModal({
  action,
  rooms,
  onClose,
  onConfirm,
}: {
  action: KeyLog["action"];
  rooms: Room[];
  onClose: () => void;
  onConfirm: (details: { room: string; reason: string; staff: string }) => void;
}) {
  const [room, setRoom] = useState(rooms[0]?.number ?? "");
  const [reason, setReason] = useState("");
  const [staff, setStaff] = useState("Reception");

  return (
    <Modal title={action} description="Every key movement must be logged per the front office manual." onClose={onClose}>
      <div className="form-grid">
        <Field label="Room">
          <select value={room} onChange={(event) => setRoom(event.target.value)}>
            {rooms.map((item) => (
              <option key={item.id} value={item.number}>
                {item.number}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Staff Member">
          <input value={staff} onChange={(event) => setStaff(event.target.value)} />
        </Field>
      </div>
      <Field label="Reason">
        <input value={reason} onChange={(event) => setReason(event.target.value)} placeholder="e.g. Guest checked in / Maintenance inspection" />
      </Field>
      <div className="sheet-footer">
        <button className="ghost-button" onClick={onClose} type="button">
          Cancel
        </button>
        <button className="primary-button" disabled={!reason} onClick={() => onConfirm({ room, reason, staff })} type="button">
          Log {action}
        </button>
      </div>
    </Modal>
  );
}

function MessageModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (values: { guest: string; room: string; caller: string; message: string; status: GuestMessage["status"] }) => void;
}) {
  const [guest, setGuest] = useState("");
  const [room, setRoom] = useState("");
  const [caller, setCaller] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<GuestMessage["status"]>("Placed in Key Box");

  return (
    <Modal title="New Guest Message" description="Record telephone or counter messages exactly as the manual requires." onClose={onClose}>
      <div className="form-grid">
        <Field label="Guest Name">
          <input value={guest} onChange={(event) => setGuest(event.target.value)} />
        </Field>
        <Field label="Room Number">
          <input value={room} onChange={(event) => setRoom(event.target.value)} placeholder="Leave blank if not yet arrived" />
        </Field>
        <Field label="Caller Name">
          <input value={caller} onChange={(event) => setCaller(event.target.value)} />
        </Field>
        <Field label="Status">
          <select value={status} onChange={(event) => setStatus(event.target.value as GuestMessage["status"])}>
            <option>Held for Arrival</option>
            <option>Placed in Key Box</option>
            <option>Delivered</option>
          </select>
        </Field>
      </div>
      <Field label="Message">
        <textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={3} />
      </Field>
      <div className="sheet-footer">
        <button className="ghost-button" onClick={onClose} type="button">
          Cancel
        </button>
        <button className="primary-button" disabled={!guest || !message} onClick={() => onCreate({ guest, room, caller, message, status })} type="button">
          Save Message
        </button>
      </div>
    </Modal>
  );
}

function ReceiptModal({ receipt, onClose }: { receipt: Receipt; onClose: () => void }) {
  return (
    <Modal description="Issued by Blue Hills Camp Front Office" onClose={onClose} title="Payment Receipt">
      <div className="receipt-print">
        <div className="receipt-head">
          <strong>Blue Hills Camp</strong>
          <span>Official Payment Receipt</span>
        </div>
        <div className="folio-line">
          <span>Receipt No.</span>
          <strong>{receipt.id}</strong>
        </div>
        <div className="folio-line">
          <span>Reservation</span>
          <strong>{receipt.reservationId}</strong>
        </div>
        <div className="folio-line">
          <span>Guest</span>
          <strong>{receipt.guest}</strong>
        </div>
        <div className="folio-line">
          <span>Purpose</span>
          <strong>{receipt.purpose}</strong>
        </div>
        <div className="folio-line">
          <span>Payment Method</span>
          <strong>{receipt.method}</strong>
        </div>
        <div className="folio-line total">
          <span>Amount Received</span>
          <strong>{money.format(receipt.amount)}</strong>
        </div>
        <div className="folio-line">
          <span>Balance Remaining</span>
          <strong>{money.format(receipt.balanceAfter)}</strong>
        </div>
        <div className="folio-line">
          <span>Issued By</span>
          <strong>
            {receipt.issuedBy} at {receipt.time}
          </strong>
        </div>
      </div>
      <div className="sheet-footer">
        <button className="ghost-button" onClick={onClose} type="button">
          Close
        </button>
        <button className="primary-button" onClick={() => window.print()} type="button">
          <Printer size={16} />
          Print Receipt
        </button>
      </div>
    </Modal>
  );
}

function HousekeepingChecklistDrawer({
  rooms,
  latestChecklist,
  onClose,
  onSave,
}: {
  rooms: Room[];
  latestChecklist?: HousekeepingChecklist;
  onClose: () => void;
  onSave: (values: HousekeepingChecklistFormValues) => void;
}) {
  const [date, setDate] = useState(todayIsoDate());
  const [submittedBy, setSubmittedBy] = useState("Housekeeping");
  const [linen, setLinen] = useState<LinenCount[]>(latestChecklist?.linen ?? createDefaultLinen());
  const [chemicals, setChemicals] = useState<ChemicalStockItem[]>(latestChecklist?.chemicals ?? createDefaultChemicals());
  const [amenities, setAmenities] = useState<AmenityStockItem[]>(latestChecklist?.amenities ?? createDefaultAmenities());
  const [roomStatuses, setRoomStatuses] = useState<RoomStatusSnapshot[]>(createRoomStatusesFromRooms(rooms));
  const [notes, setNotes] = useState("");

  const updateLinen = (index: number, field: "clean" | "dirty", value: number) => {
    setLinen((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item)));
  };

  const updateChemical = (index: number, quantity: number) => {
    setChemicals((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, quantity } : item)));
  };

  const updateAmenity = (index: number, quantity: number) => {
    setAmenities((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, quantity } : item)));
  };

  const updateRoomStatus = (roomNumber: string, status: RoomStatus) => {
    setRoomStatuses((current) => current.map((snapshot) => (snapshot.room === roomNumber ? { ...snapshot, status } : snapshot)));
  };

  const roomsByLodge = LODGE_ORDER.map((lodge) => ({
    lodge,
    snapshots: roomStatuses.filter((snapshot) => snapshot.lodge === lodge),
  }));

  return (
    <Drawer
      title="Daily Housekeeping Checklist"
      description="Structured replacement for the WhatsApp/Excel daily report."
      onClose={onClose}
    >
      <div className="form-grid">
        <Field label="Checklist Date">
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </Field>
        <Field label="Submitted By">
          <input value={submittedBy} onChange={(event) => setSubmittedBy(event.target.value)} />
        </Field>
      </div>

      <section className="checklist-section">
        <h3>Clean & Dirty Linen</h3>
        <table className="stock-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Clean Available</th>
              <th>Dirty</th>
              <th>Par Stock</th>
              <th>Variance</th>
            </tr>
          </thead>
          <tbody>
            {linen.map((item, index) => {
              const variance = item.clean + item.dirty - item.parStock;
              return (
                <tr key={item.type} className={item.clean === 0 || variance !== 0 ? "stock-low" : ""}>
                  <td>{item.type}</td>
                  <td>
                    <input
                      className="stock-input"
                      min={0}
                      onChange={(event) => updateLinen(index, "clean", Number(event.target.value))}
                      type="number"
                      value={item.clean}
                    />
                  </td>
                  <td>
                    <input
                      className="stock-input"
                      min={0}
                      onChange={(event) => updateLinen(index, "dirty", Number(event.target.value))}
                      type="number"
                      value={item.dirty}
                    />
                  </td>
                  <td>{item.parStock}</td>
                  <td className={variance !== 0 ? "stock-low-cell" : ""}>{variance === 0 ? "OK" : variance > 0 ? `+${variance}` : variance}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section className="checklist-section">
        <h3>Chemical Checklist</h3>
        <table className="stock-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Reorder Level</th>
            </tr>
          </thead>
          <tbody>
            {chemicals.map((item, index) => (
              <tr key={item.name} className={item.quantity <= item.reorderLevel ? "stock-low" : ""}>
                <td>{item.name}</td>
                <td>
                  <input
                    className="stock-input"
                    min={0}
                    onChange={(event) => updateChemical(index, Number(event.target.value))}
                    type="number"
                    value={item.quantity}
                  />
                </td>
                <td>{item.unit}</td>
                <td>{item.reorderLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="checklist-section">
        <h3>Guest Amenities</h3>
        <table className="stock-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Reorder Level</th>
            </tr>
          </thead>
          <tbody>
            {amenities.map((item, index) => (
              <tr key={item.name} className={item.quantity <= item.reorderLevel ? "stock-low" : ""}>
                <td>{item.name}</td>
                <td>
                  <input
                    className="stock-input"
                    min={0}
                    onChange={(event) => updateAmenity(index, Number(event.target.value))}
                    type="number"
                    value={item.quantity}
                  />
                </td>
                <td>{item.reorderLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="checklist-section">
        <h3>Room Occupancy</h3>
        <div className="lodge-grid">
          {roomsByLodge.map(({ lodge, snapshots }) => (
            <div className="lodge-section" key={lodge}>
              <h4 className="lodge-heading">{lodge}</h4>
              <table className="stock-table">
                <thead>
                  <tr>
                    <th>Room</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {snapshots.map((snapshot) => (
                    <tr key={snapshot.room}>
                      <td>{snapshot.room}</td>
                      <td>
                        <select
                          value={snapshot.status}
                          onChange={(event) => updateRoomStatus(snapshot.room, event.target.value as RoomStatus)}
                        >
                          <option value="Occupied">Occupied</option>
                          <option value="Available">Vacant</option>
                          <option value="Dirty">Checkout</option>
                          <option value="Staff">Staff</option>
                          <option value="Maintenance">Maintenance</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </section>

      <Field label="Notes (optional)">
        <textarea onChange={(event) => setNotes(event.target.value)} rows={2} value={notes} />
      </Field>

      <div className="sheet-footer">
        <button className="ghost-button" onClick={onClose} type="button">
          Cancel
        </button>
        <button
          className="primary-button"
          disabled={!date || !submittedBy}
          onClick={() =>
            onSave({
              date,
              submittedBy,
              linen,
              chemicals,
              amenities,
              roomStatuses,
              notes: notes || undefined,
            })
          }
          type="button"
        >
          Submit Checklist
        </button>
      </div>
    </Drawer>
  );
}

function HousekeepingChecklistDetailModal({
  checklist,
  onClose,
}: {
  checklist: HousekeepingChecklist;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const whatsAppText = formatChecklistAsWhatsApp(checklist);
  const alerts = computeStockAlerts(checklist);

  const copySummary = async () => {
    await navigator.clipboard.writeText(whatsAppText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      title={`Housekeeping Checklist - ${formatChecklistDateLabel(checklist.date)}`}
      description={`Submitted by ${checklist.submittedBy} at ${checklist.submittedAt}`}
      onClose={onClose}
    >
      {alerts.length > 0 && (
        <section className="checklist-section">
          <h3>Alerts Detected</h3>
          <div className="attention-list">
            {alerts.map((alert) => (
              <Attention key={`${alert.kind}-${alert.item}`} icon={Package} title={alert.item} description={alert.message} />
            ))}
          </div>
        </section>
      )}

      <section className="checklist-section">
        <h3>Clean Linen Available</h3>
        <table className="stock-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Clean</th>
              <th>Dirty</th>
              <th>Par Stock</th>
            </tr>
          </thead>
          <tbody>
            {checklist.linen.map((item) => (
              <tr key={item.type} className={item.clean === 0 ? "stock-low" : ""}>
                <td>{item.type}</td>
                <td>{item.clean}</td>
                <td>{item.dirty}</td>
                <td>{item.parStock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="checklist-section">
        <h3>Chemicals</h3>
        <table className="stock-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            {checklist.chemicals.map((item) => (
              <tr key={item.name} className={item.quantity <= item.reorderLevel ? "stock-low" : ""}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="checklist-section">
        <h3>Guest Amenities</h3>
        <table className="stock-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {checklist.amenities.map((item) => (
              <tr key={item.name} className={item.quantity <= item.reorderLevel ? "stock-low" : ""}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="checklist-section">
        <h3>Room Occupancy</h3>
        <div className="lodge-grid">
          {LODGE_ORDER.map((lodge) => {
            const snapshots = checklist.roomStatuses.filter((snapshot) => snapshot.lodge === lodge);
            if (snapshots.length === 0) return null;
            return (
              <div className="lodge-section" key={lodge}>
                <h4 className="lodge-heading">{lodge}</h4>
                <div className="stack">
                  {snapshots.map((snapshot) => (
                    <div className="task-card" key={snapshot.room}>
                      <div>
                        <strong>{snapshot.room}</strong>
                        {snapshot.notes && <span>{snapshot.notes}</span>}
                      </div>
                      <Badge label={snapshot.status} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="checklist-section">
        <h3>WhatsApp-style Summary</h3>
        <pre className="whatsapp-export">{whatsAppText}</pre>
      </section>

      <div className="sheet-footer">
        <button className="ghost-button" onClick={onClose} type="button">
          Close
        </button>
        <button className="primary-button" onClick={copySummary} type="button">
          <ClipboardCopy size={16} />
          {copied ? "Copied!" : "Copy as WhatsApp Text"}
        </button>
      </div>
    </Modal>
  );
}

function ActivityBookingDrawer({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (values: ActivityBookingFormValues) => void;
}) {
  const [activity, setActivity] = useState<ActivityType>("Zipline");
  const [guest, setGuest] = useState("");
  const [participants, setParticipants] = useState(1);
  const [date, setDate] = useState(dates[0]);
  const [time, setTime] = useState("09:00");
  const [instructor, setInstructor] = useState("");
  const [price, setPrice] = useState(ACTIVITY_PRICE.Zipline);
  const [payment, setPayment] = useState<ActivityBooking["payment"]>("Room Charge");
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [guardianPresent, setGuardianPresent] = useState(false);
  const [weightKg, setWeightKg] = useState("");
  const [medicalClear, setMedicalClear] = useState(false);
  const [indemnitySigned, setIndemnitySigned] = useState(false);
  const [notes, setNotes] = useState("");

  const updateActivity = (next: ActivityType) => {
    setActivity(next);
    setPrice(ACTIVITY_PRICE[next]);
  };

  const eligibilityMet = ageConfirmed && medicalClear && indemnitySigned;

  return (
    <Drawer
      title="New Activity Booking"
      description="Captures the participant eligibility and indemnity the manual requires before anyone rides."
      onClose={onClose}
    >
      <div className="form-grid">
        <Field label="Activity">
          <select value={activity} onChange={(event) => updateActivity(event.target.value as ActivityType)}>
            {ACTIVITY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Guest / Group">
          <input value={guest} onChange={(event) => setGuest(event.target.value)} placeholder="e.g. Ncube Holdings" />
        </Field>
        <Field label="Participants">
          <input min={1} onChange={(event) => setParticipants(Number(event.target.value))} type="number" value={participants} />
        </Field>
        <Field label="Instructor / Operator">
          <input value={instructor} onChange={(event) => setInstructor(event.target.value)} placeholder="e.g. Chipo" />
        </Field>
        <Field label="Date">
          <select value={date} onChange={(event) => setDate(event.target.value)}>
            {dates.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Time">
          <input onChange={(event) => setTime(event.target.value)} type="time" value={time} />
        </Field>
        <Field label="Price (USD)">
          <input min={0} onChange={(event) => setPrice(Number(event.target.value))} type="number" value={price} />
        </Field>
        <Field label="Payment">
          <select value={payment} onChange={(event) => setPayment(event.target.value as ActivityBooking["payment"])}>
            <option value="Room Charge">Charge to Room</option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
          </select>
        </Field>
        <Field label="Weight (kg, optional)">
          <input onChange={(event) => setWeightKg(event.target.value)} placeholder="For zipline/quad weight limits" type="number" value={weightKg} />
        </Field>
      </div>

      <section className="form-section">
        <h3>Eligibility &amp; Indemnity (Section 4-8)</h3>
        <label className="checkbox-row">
          <input checked={ageConfirmed} onChange={(event) => setAgeConfirmed(event.target.checked)} type="checkbox" />
          Participant is 18+, or a parent/guardian will be present to sign for a minor
        </label>
        <label className="checkbox-row">
          <input checked={guardianPresent} onChange={(event) => setGuardianPresent(event.target.checked)} type="checkbox" />
          Parent/guardian confirmed present for any participant under 18
        </label>
        <label className="checkbox-row">
          <input checked={medicalClear} onChange={(event) => setMedicalClear(event.target.checked)} type="checkbox" />
          No disqualifying medical condition declared (pregnancy, heart, neck/back, recent surgery)
        </label>
        <label className="checkbox-row">
          <input checked={indemnitySigned} onChange={(event) => setIndemnitySigned(event.target.checked)} type="checkbox" />
          Indemnity / waiver form signed
        </label>
        {!eligibilityMet && <p className="muted">All three eligibility checks and the indemnity must be confirmed before the booking can be saved.</p>}
      </section>

      <Field label="Notes (optional)">
        <textarea onChange={(event) => setNotes(event.target.value)} rows={2} value={notes} />
      </Field>

      <div className="sheet-footer">
        <button className="ghost-button" onClick={onClose} type="button">
          Cancel
        </button>
        <button
          className="primary-button"
          disabled={!guest || !instructor || !eligibilityMet}
          onClick={() =>
            onSave({
              activity,
              guest,
              participants,
              date,
              time,
              instructor,
              price,
              payment,
              ageConfirmed,
              guardianPresent,
              weightKg,
              medicalClear,
              indemnitySigned,
              notes,
            })
          }
          type="button"
        >
          Save Booking
        </button>
      </div>
    </Drawer>
  );
}

function ActivityChecklistDrawer({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (values: ActivityChecklistFormValues) => void;
}) {
  const [activity, setActivity] = useState<ActivityType>("Zipline");
  const [date, setDate] = useState(todayIsoDate());
  const [submittedBy, setSubmittedBy] = useState("");
  const [weather, setWeather] = useState<WeatherCondition>("Clear");
  const [items, setItems] = useState<ActivityChecklistItem[]>(createDefaultActivityChecklistItems("Zipline"));
  const [notes, setNotes] = useState("");

  const updateActivity = (next: ActivityType) => {
    setActivity(next);
    setItems(createDefaultActivityChecklistItems(next));
  };

  const toggleItem = (index: number) => {
    setItems((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? { ...item, status: item.status === "Pass" ? "Fail" : "Pass" } : item)),
    );
  };

  const failedCount = items.filter((item) => item.status === "Fail").length;
  const courseOpen = weather === "Clear" && failedCount === 0;

  return (
    <Drawer
      title="Daily Activity Checklist"
      description="Pre-use inspection required before the course opens (Section 3.1, Annex 3 / 6)."
      onClose={onClose}
    >
      <div className="form-grid">
        <Field label="Activity">
          <select value={activity} onChange={(event) => updateActivity(event.target.value as ActivityType)}>
            {ACTIVITY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Checklist Date">
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </Field>
        <Field label="Submitted By">
          <input value={submittedBy} onChange={(event) => setSubmittedBy(event.target.value)} placeholder="Operator name" />
        </Field>
        <Field label="Weather Conditions">
          <select value={weather} onChange={(event) => setWeather(event.target.value as WeatherCondition)}>
            {WEATHER_CONDITIONS.map((condition) => (
              <option key={condition} value={condition}>
                {condition}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <section className="checklist-section">
        <h3>Pre-Use Equipment Inspection</h3>
        <div className="stack">
          {items.map((item, index) => (
            <label className="checklist-toggle-row" key={item.label}>
              <span>{item.label}</span>
              <button
                className={`checklist-toggle ${item.status === "Pass" ? "pass" : "fail"}`}
                onClick={() => toggleItem(index)}
                type="button"
              >
                {item.status}
              </button>
            </label>
          ))}
        </div>
      </section>

      <div className={courseOpen ? "finding-banner ok" : "finding-banner blocked"}>
        {courseOpen
          ? "All items pass and weather is clear - the course may open."
          : `Course should stay closed: ${weather !== "Clear" ? `weather is ${weather}` : ""}${weather !== "Clear" && failedCount > 0 ? " and " : ""}${failedCount > 0 ? `${failedCount} item${failedCount > 1 ? "s" : ""} failed inspection` : ""}.`}
      </div>

      <Field label="Notes (optional)">
        <textarea onChange={(event) => setNotes(event.target.value)} rows={2} value={notes} placeholder="e.g. Equipment pulled for repair, escalated to supervisor" />
      </Field>

      <div className="sheet-footer">
        <button className="ghost-button" onClick={onClose} type="button">
          Cancel
        </button>
        <button
          className="primary-button"
          disabled={!date || !submittedBy}
          onClick={() => onSave({ activity, date, submittedBy, weather, items, notes })}
          type="button"
        >
          Submit Checklist
        </button>
      </div>
    </Drawer>
  );
}

function SafetyIncidentModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (values: SafetyIncidentFormValues) => void;
}) {
  const [activity, setActivity] = useState<ActivityType>("Zipline");
  const [participantName, setParticipantName] = useState("");
  const [operatorName, setOperatorName] = useState("");
  const [date, setDate] = useState(todayIsoDate());
  const [time, setTime] = useState(nowTime());
  const [natureOfInjury, setNatureOfInjury] = useState<IncidentNature>("Abrasions/Scrapes");
  const [firstAidProvided, setFirstAidProvided] = useState(true);
  const [ambulanceCalled, setAmbulanceCalled] = useState(false);
  const [etdPerformed, setEtdPerformed] = useState(false);
  const [causeOfIncident, setCauseOfIncident] = useState("");
  const [actionTaken, setActionTaken] = useState("");
  const [witnessName, setWitnessName] = useState("");

  return (
    <Modal
      title="Safety / Incident Report"
      description="Every injury, near miss or emergency take-down must be filed within 24 hours (Section 3.8, Annex 7)."
      onClose={onClose}
    >
      <div className="form-grid">
        <Field label="Activity">
          <select value={activity} onChange={(event) => setActivity(event.target.value as ActivityType)}>
            {ACTIVITY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Participant Name">
          <input value={participantName} onChange={(event) => setParticipantName(event.target.value)} />
        </Field>
        <Field label="Operator on Duty">
          <input value={operatorName} onChange={(event) => setOperatorName(event.target.value)} />
        </Field>
        <Field label="Witness Name (optional)">
          <input value={witnessName} onChange={(event) => setWitnessName(event.target.value)} />
        </Field>
        <Field label="Date">
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </Field>
        <Field label="Time">
          <input onChange={(event) => setTime(event.target.value)} type="time" value={time} />
        </Field>
        <Field label="Nature of Injury">
          <select value={natureOfInjury} onChange={(event) => setNatureOfInjury(event.target.value as IncidentNature)}>
            {INCIDENT_NATURES.map((nature) => (
              <option key={nature} value={nature}>
                {nature}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <section className="form-section">
        <h3>First Aid &amp; Emergency Response</h3>
        <label className="checkbox-row">
          <input checked={firstAidProvided} onChange={(event) => setFirstAidProvided(event.target.checked)} type="checkbox" />
          First aid provided
        </label>
        <label className="checkbox-row">
          <input checked={ambulanceCalled} onChange={(event) => setAmbulanceCalled(event.target.checked)} type="checkbox" />
          Ambulance called
        </label>
        <label className="checkbox-row">
          <input checked={etdPerformed} onChange={(event) => setEtdPerformed(event.target.checked)} type="checkbox" />
          Emergency take-down (ETD) performed
        </label>
      </section>

      <Field label="Cause of Incident">
        <textarea onChange={(event) => setCauseOfIncident(event.target.value)} rows={3} value={causeOfIncident} placeholder="What happened, and were any rules broken?" />
      </Field>
      <Field label="Action Taken">
        <textarea onChange={(event) => setActionTaken(event.target.value)} rows={3} value={actionTaken} placeholder="What did the operator(s) do in response?" />
      </Field>

      <div className="sheet-footer">
        <button className="ghost-button" onClick={onClose} type="button">
          Cancel
        </button>
        <button
          className="primary-button"
          disabled={!participantName || !operatorName || !causeOfIncident || !actionTaken}
          onClick={() =>
            onSave({
              activity,
              participantName,
              operatorName,
              date,
              time,
              natureOfInjury,
              firstAidProvided,
              ambulanceCalled,
              etdPerformed,
              causeOfIncident,
              actionTaken,
              witnessName,
            })
          }
          type="button"
        >
          Submit Report
        </button>
      </div>
    </Modal>
  );
}

function OrderDrawer({
  initialItem,
  onClose,
  onSave,
}: {
  initialItem?: string;
  onClose: () => void;
  onSave: (values: PosOrderFormValues) => void;
}) {
  const [table, setTable] = useState("");
  const [guest, setGuest] = useState("");
  const [waiter, setWaiter] = useState("");
  const [payment, setPayment] = useState<PosOrder["payment"]>("Cash");
  const [cart, setCart] = useState<OrderLineItem[]>(() => {
    if (!initialItem) return [];
    const menuItem = MENU_BY_NAME[initialItem];
    return menuItem ? [{ name: menuItem.name, price: menuItem.price, quantity: 1 }] : [];
  });
  const [ageVerified, setAgeVerified] = useState(false);

  const addItem = (name: string) => {
    const menuItem = MENU_BY_NAME[name];
    if (!menuItem) return;
    setCart((current) => {
      const existing = current.find((line) => line.name === name);
      if (existing) {
        return current.map((line) => (line.name === name ? { ...line, quantity: line.quantity + 1 } : line));
      }
      return [...current, { name: menuItem.name, price: menuItem.price, quantity: 1 }];
    });
  };

  const changeQuantity = (name: string, delta: number) => {
    setCart((current) =>
      current
        .map((line) => (line.name === name ? { ...line, quantity: line.quantity + delta } : line))
        .filter((line) => line.quantity > 0),
    );
  };

  const removeItem = (name: string) => {
    setCart((current) => current.filter((line) => line.name !== name));
  };

  const total = cart.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const containsAlcohol = cart.some((line) => MENU_BY_NAME[line.name]?.category === "Alcohol");
  const canSave = Boolean(table && guest && waiter && cart.length > 0 && (!containsAlcohol || ageVerified));

  return (
    <Drawer title="New POS Order" description="Fast order taking with cash, card, or room charge." onClose={onClose}>
      <div className="form-grid">
        <Field label="Table / Location">
          <input value={table} onChange={(event) => setTable(event.target.value)} placeholder="e.g. Table 4" />
        </Field>
        <Field label="Guest">
          <input value={guest} onChange={(event) => setGuest(event.target.value)} placeholder="e.g. Tariro Moyo" />
        </Field>
        <Field label="Waiter">
          <input value={waiter} onChange={(event) => setWaiter(event.target.value)} placeholder="e.g. Lynette" />
        </Field>
        <Field label="Payment Method">
          <select value={payment} onChange={(event) => setPayment(event.target.value as PosOrder["payment"])}>
            <option>Cash</option>
            <option>Card</option>
            <option>Room Charge</option>
          </select>
        </Field>
      </div>

      <section className="form-section">
        <h3>Menu</h3>
        <div className="menu-grid">
          {MENU_CATALOG.map((item) => (
            <button className="menu-tile" key={item.name} onClick={() => addItem(item.name)} type="button">
              <Utensils size={18} />
              <span>
                {item.name}
                <small>{money.format(item.price)}</small>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="form-section">
        <h3>Order Items</h3>
        {cart.length === 0 ? (
          <p className="muted">Tap a menu item to add it to this order.</p>
        ) : (
          <div className="stack">
            {cart.map((line) => (
              <div className="folio-line" key={line.name}>
                <div>
                  <strong>{line.name}</strong>
                  <span className="muted block">{money.format(line.price)} each</span>
                </div>
                <div className="qty-stepper">
                  <button className="icon-button" onClick={() => changeQuantity(line.name, -1)} type="button" aria-label={`Remove one ${line.name}`}>
                    <Minus size={14} />
                  </button>
                  <span>{line.quantity}</span>
                  <button className="icon-button" onClick={() => changeQuantity(line.name, 1)} type="button" aria-label={`Add one ${line.name}`}>
                    <Plus size={14} />
                  </button>
                  <strong>{money.format(line.price * line.quantity)}</strong>
                  <button className="icon-button" onClick={() => removeItem(line.name)} type="button" aria-label={`Remove ${line.name}`}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
            <div className="folio-line total">
              <span>Total</span>
              <strong>{money.format(total)}</strong>
            </div>
          </div>
        )}
      </section>

      {containsAlcohol && (
        <label className="checkbox-row">
          <input checked={ageVerified} onChange={(event) => setAgeVerified(event.target.checked)} type="checkbox" />
          Guest's legal drinking age has been verified (Section H)
        </label>
      )}

      <div className="sheet-footer">
        <button className="ghost-button" onClick={onClose} type="button">
          Cancel
        </button>
        <button
          className="primary-button"
          disabled={!canSave}
          onClick={() => onSave({ table, guest, waiter, payment, items: cart, ageVerified })}
          type="button"
        >
          Send to Kitchen
        </button>
      </div>
    </Drawer>
  );
}

function KitchenChecklistDrawer({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (values: KitchenChecklistFormValues) => void;
}) {
  const [date, setDate] = useState(todayIsoDate());
  const [submittedBy, setSubmittedBy] = useState("");
  const [fridgeTempC, setFridgeTempC] = useState(4);
  const [items, setItems] = useState<KitchenChecklistItem[]>(createDefaultKitchenChecklistItems());
  const [notes, setNotes] = useState("");

  const toggleItem = (index: number) => {
    setItems((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? { ...item, status: item.status === "Done" ? "Pending" : "Done" } : item)),
    );
  };

  const pendingCount = items.filter((item) => item.status === "Pending").length;
  const fridgeSafe = fridgeTempC <= FRIDGE_SAFE_MAX_C;

  return (
    <Drawer
      title="Kitchen Closing Checklist"
      description="Kitchen closing SOP and dining room open/close, in one submission (Section F)."
      onClose={onClose}
    >
      <div className="form-grid">
        <Field label="Checklist Date">
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </Field>
        <Field label="Submitted By">
          <input value={submittedBy} onChange={(event) => setSubmittedBy(event.target.value)} placeholder="e.g. Chef" />
        </Field>
        <Field label="Fridge Temperature (°C)">
          <input min={-5} max={20} onChange={(event) => setFridgeTempC(Number(event.target.value))} type="number" value={fridgeTempC} />
        </Field>
      </div>

      {!fridgeSafe && (
        <div className="finding-banner blocked">
          {fridgeTempC}°C is above the {FRIDGE_SAFE_MAX_C}°C safe storage limit - flag for maintenance before closing.
        </div>
      )}

      {KITCHEN_CHECKLIST_SECTIONS.map((section) => (
        <section className="checklist-section" key={section}>
          <h3>{section}</h3>
          <div className="stack">
            {items.map((item, index) =>
              item.section === section ? (
                <label className="checklist-toggle-row" key={item.label}>
                  <span>{item.label}</span>
                  <button
                    className={`checklist-toggle ${item.status === "Done" ? "pass" : "fail"}`}
                    onClick={() => toggleItem(index)}
                    type="button"
                  >
                    {item.status}
                  </button>
                </label>
              ) : null,
            )}
          </div>
        </section>
      ))}

      <Field label="Notes (optional)">
        <textarea onChange={(event) => setNotes(event.target.value)} rows={2} value={notes} placeholder="e.g. Equipment fault, escalated to maintenance" />
      </Field>

      <div className="sheet-footer">
        <button className="ghost-button" onClick={onClose} type="button">
          Cancel
        </button>
        <button
          className="primary-button"
          disabled={!date || !submittedBy}
          onClick={() => onSave({ date, submittedBy, fridgeTempC, items, notes })}
          type="button"
        >
          Submit Checklist {pendingCount > 0 ? `(${pendingCount} pending)` : ""}
        </button>
      </div>
    </Drawer>
  );
}

function PurchaseRequestDrawer({
  inventoryItems,
  onClose,
  onSave,
}: {
  inventoryItems: InventoryItem[];
  onClose: () => void;
  onSave: (values: PurchaseRequestFormValues) => void;
}) {
  const [department, setDepartment] = useState("");
  const [requestedBy, setRequestedBy] = useState("");
  const [priority, setPriority] = useState<RequestPriority>("Normal");
  const [requiredDate, setRequiredDate] = useState(dates[1]);
  const [reason, setReason] = useState("");
  const [items, setItems] = useState<PurchaseLineItem[]>([{ description: "", quantity: 1, estimatedCost: 0 }]);

  const updateLine = (index: number, patch: Partial<PurchaseLineItem>) => {
    setItems((current) => current.map((line, lineIndex) => (lineIndex === index ? { ...line, ...patch } : line)));
  };

  const addLine = () => setItems((current) => [...current, { description: "", quantity: 1, estimatedCost: 0 }]);
  const removeLine = (index: number) => setItems((current) => current.filter((_, lineIndex) => lineIndex !== index));

  const estimatedTotal = items.reduce((sum, item) => sum + item.estimatedCost, 0);
  const canSave = Boolean(
    department && requestedBy && requiredDate && reason && items.length > 0 && items.every((item) => item.description && item.quantity > 0),
  );

  return (
    <Drawer title="New Purchase Request" description="Department raises the request; a manager approves it before a PO can be issued." onClose={onClose}>
      <div className="form-grid">
        <Field label="Department">
          <input value={department} onChange={(event) => setDepartment(event.target.value)} placeholder="e.g. Kitchen" />
        </Field>
        <Field label="Requested By">
          <input value={requestedBy} onChange={(event) => setRequestedBy(event.target.value)} placeholder="e.g. Chef" />
        </Field>
        <Field label="Priority">
          <select value={priority} onChange={(event) => setPriority(event.target.value as RequestPriority)}>
            {REQUEST_PRIORITIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Required Date">
          <select value={requiredDate} onChange={(event) => setRequiredDate(event.target.value)}>
            {dates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Reason">
        <textarea value={reason} onChange={(event) => setReason(event.target.value)} rows={2} placeholder="Why is this needed?" />
      </Field>

      <section className="form-section">
        <h3>Items</h3>
        <div className="stack">
          {items.map((line, index) => (
            <div className="line-item-row" key={index}>
              <select
                value={line.itemId ?? ""}
                onChange={(event) => {
                  const catalogItem = inventoryItems.find((item) => item.id === event.target.value);
                  updateLine(index, { itemId: catalogItem?.id, description: catalogItem?.name ?? line.description });
                }}
              >
                <option value="">Custom item...</option>
                {inventoryItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <input
                value={line.description}
                onChange={(event) => updateLine(index, { description: event.target.value })}
                placeholder="Description"
              />
              <input
                min={1}
                onChange={(event) => updateLine(index, { quantity: Number(event.target.value) })}
                placeholder="Qty"
                type="number"
                value={line.quantity}
              />
              <input
                min={0}
                onChange={(event) => updateLine(index, { estimatedCost: Number(event.target.value) })}
                placeholder="Est. cost"
                type="number"
                value={line.estimatedCost}
              />
              <button className="icon-button" disabled={items.length === 1} onClick={() => removeLine(index)} type="button" aria-label="Remove item">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
        <button className="ghost-button" onClick={addLine} type="button">
          <Plus size={16} />
          Add Item
        </button>
        <div className="folio-line total">
          <span>Estimated Total</span>
          <strong>{money.format(estimatedTotal)}</strong>
        </div>
      </section>

      <div className="sheet-footer">
        <button className="ghost-button" onClick={onClose} type="button">
          Cancel
        </button>
        <button
          className="primary-button"
          disabled={!canSave}
          onClick={() => onSave({ department, requestedBy, priority, requiredDate, reason, items })}
          type="button"
        >
          Submit for Approval
        </button>
      </div>
    </Drawer>
  );
}

function PurchaseOrderDrawer({
  request,
  suppliers,
  onClose,
  onSave,
}: {
  request: PurchaseRequest;
  suppliers: Supplier[];
  onClose: () => void;
  onSave: (values: PurchaseOrderFormValues) => void;
}) {
  const [supplierId, setSupplierId] = useState(suppliers[0]?.id ?? "");
  const [deliveryDate, setDeliveryDate] = useState(request.requiredDate);
  const [approvedBy, setApprovedBy] = useState("");
  const [notes, setNotes] = useState("");
  const [unitPrices, setUnitPrices] = useState<number[]>(
    request.items.map((item) => Math.round((item.estimatedCost / Math.max(1, item.quantity)) * 100) / 100),
  );

  const items = request.items.map((item, index) => ({
    itemId: item.itemId,
    description: item.description,
    quantity: item.quantity,
    unitPrice: unitPrices[index] ?? 0,
  }));
  const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const canSave = Boolean(supplierId && deliveryDate && approvedBy);

  return (
    <Drawer title={`Issue Purchase Order - ${request.id}`} description={`From an approved request for ${request.department}: ${request.reason}`} onClose={onClose}>
      <div className="form-grid">
        <Field label="Supplier">
          <select value={supplierId} onChange={(event) => setSupplierId(event.target.value)}>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
                {supplier.preferred ? " (Preferred)" : ""}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Delivery Date">
          <select value={deliveryDate} onChange={(event) => setDeliveryDate(event.target.value)}>
            {dates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Approved By">
          <input value={approvedBy} onChange={(event) => setApprovedBy(event.target.value)} placeholder="Manager name" />
        </Field>
      </div>

      <section className="form-section">
        <h3>Items</h3>
        <div className="stack">
          {request.items.map((item, index) => (
            <div className="line-item-row" key={index}>
              <span>
                {item.quantity}x {item.description}
              </span>
              <input
                min={0}
                onChange={(event) =>
                  setUnitPrices((current) => current.map((price, priceIndex) => (priceIndex === index ? Number(event.target.value) : price)))
                }
                placeholder="Unit price"
                type="number"
                value={unitPrices[index] ?? 0}
              />
            </div>
          ))}
        </div>
        <div className="folio-line total">
          <span>Total</span>
          <strong>{money.format(total)}</strong>
        </div>
      </section>

      <Field label="Notes (optional)">
        <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={2} />
      </Field>

      <div className="sheet-footer">
        <button className="ghost-button" onClick={onClose} type="button">
          Cancel
        </button>
        <button className="primary-button" disabled={!canSave} onClick={() => onSave({ supplierId, deliveryDate, approvedBy, items, notes })} type="button">
          Issue Purchase Order
        </button>
      </div>
    </Drawer>
  );
}

function GoodsReceivedModal({
  order,
  onClose,
  onSave,
}: {
  order: PurchaseOrder;
  onClose: () => void;
  onSave: (values: GoodsReceivedFormValues) => void;
}) {
  const [receivedBy, setReceivedBy] = useState("");
  const [comments, setComments] = useState("");
  const [lines, setLines] = useState(
    order.items.map((item) => ({
      itemId: item.itemId,
      description: item.description,
      quantityOrdered: item.quantityOrdered,
      quantityReceived: item.quantityOrdered,
      condition: "Good" as GoodsReceivedCondition,
    })),
  );

  const updateLine = (index: number, patch: Partial<(typeof lines)[number]>) => {
    setLines((current) => current.map((line, lineIndex) => (lineIndex === index ? { ...line, ...patch } : line)));
  };

  return (
    <Modal title={`Receive Goods - ${order.id}`} description="Stores verifies quantity and condition before inventory updates." onClose={onClose}>
      <div className="form-grid">
        <Field label="Received By">
          <input value={receivedBy} onChange={(event) => setReceivedBy(event.target.value)} placeholder="e.g. Stores Officer" />
        </Field>
      </div>

      <section className="form-section">
        <h3>Items Ordered</h3>
        <div className="stack">
          {lines.map((line, index) => (
            <div className="line-item-row" key={index}>
              <span>
                {line.description}
                <small className="block muted">Ordered {line.quantityOrdered}</small>
              </span>
              <input
                min={0}
                onChange={(event) => updateLine(index, { quantityReceived: Number(event.target.value) })}
                type="number"
                value={line.quantityReceived}
              />
              <select
                value={line.condition}
                onChange={(event) => updateLine(index, { condition: event.target.value as GoodsReceivedCondition })}
              >
                <option>Good</option>
                <option>Damaged</option>
                <option>Partial</option>
              </select>
            </div>
          ))}
        </div>
      </section>

      <Field label="Comments (optional)">
        <textarea value={comments} onChange={(event) => setComments(event.target.value)} rows={2} />
      </Field>

      <div className="sheet-footer">
        <button className="ghost-button" onClick={onClose} type="button">
          Cancel
        </button>
        <button className="primary-button" disabled={!receivedBy} onClick={() => onSave({ receivedBy, comments, items: lines })} type="button">
          Confirm Goods Received
        </button>
      </div>
    </Modal>
  );
}

function InventoryItemDrawer({
  suppliers,
  onClose,
  onSave,
}: {
  suppliers: Supplier[];
  onClose: () => void;
  onSave: (values: InventoryItemFormValues) => void;
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<StockCategory>("Food");
  const [unit, setUnit] = useState("");
  const [supplierId, setSupplierId] = useState(suppliers[0]?.id ?? "");
  const [reorderLevel, setReorderLevel] = useState(10);
  const [minStock, setMinStock] = useState(5);
  const [maxStock, setMaxStock] = useState(50);
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const [averageCost, setAverageCost] = useState(0);

  const canSave = Boolean(name && unit && supplierId);

  return (
    <Drawer title="New Item" description="Add a stock item to the item master." onClose={onClose}>
      <div className="form-grid">
        <Field label="Item Name">
          <input value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Chicken" />
        </Field>
        <Field label="Category">
          <select value={category} onChange={(event) => setCategory(event.target.value as StockCategory)}>
            {STOCK_CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Unit">
          <input value={unit} onChange={(event) => setUnit(event.target.value)} placeholder="e.g. kg, case, each" />
        </Field>
        <Field label="Supplier">
          <select value={supplierId} onChange={(event) => setSupplierId(event.target.value)}>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Current Quantity">
          <input min={0} onChange={(event) => setCurrentQuantity(Number(event.target.value))} type="number" value={currentQuantity} />
        </Field>
        <Field label="Average Cost (USD)">
          <input min={0} onChange={(event) => setAverageCost(Number(event.target.value))} type="number" value={averageCost} />
        </Field>
        <Field label="Reorder Level">
          <input min={0} onChange={(event) => setReorderLevel(Number(event.target.value))} type="number" value={reorderLevel} />
        </Field>
        <Field label="Min / Max Stock">
          <div className="line-item-row">
            <input min={0} onChange={(event) => setMinStock(Number(event.target.value))} type="number" value={minStock} />
            <input min={0} onChange={(event) => setMaxStock(Number(event.target.value))} type="number" value={maxStock} />
          </div>
        </Field>
      </div>

      <div className="sheet-footer">
        <button className="ghost-button" onClick={onClose} type="button">
          Cancel
        </button>
        <button
          className="primary-button"
          disabled={!canSave}
          onClick={() => onSave({ name, category, unit, supplierId, reorderLevel, minStock, maxStock, currentQuantity, averageCost })}
          type="button"
        >
          Add Item
        </button>
      </div>
    </Drawer>
  );
}

function SupplierDrawer({ onClose, onSave }: { onClose: () => void; onSave: (values: SupplierFormValues) => void }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [preferred, setPreferred] = useState(false);
  const [paymentTerms, setPaymentTerms] = useState("30 days");

  const canSave = Boolean(name && category && contactPerson && phone);

  return (
    <Drawer title="New Supplier" description="Maintain the supplier database for purchase orders." onClose={onClose}>
      <div className="form-grid">
        <Field label="Supplier Name">
          <input value={name} onChange={(event) => setName(event.target.value)} />
        </Field>
        <Field label="Category">
          <input value={category} onChange={(event) => setCategory(event.target.value)} placeholder="e.g. Food & Produce" />
        </Field>
        <Field label="Contact Person">
          <input value={contactPerson} onChange={(event) => setContactPerson(event.target.value)} />
        </Field>
        <Field label="Phone">
          <input value={phone} onChange={(event) => setPhone(event.target.value)} />
        </Field>
        <Field label="Email (optional)">
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" />
        </Field>
        <Field label="Payment Terms">
          <input value={paymentTerms} onChange={(event) => setPaymentTerms(event.target.value)} placeholder="e.g. 30 days, COD" />
        </Field>
        <Field label="Physical Address (optional)">
          <input value={address} onChange={(event) => setAddress(event.target.value)} />
        </Field>
        <Field label="Tax Number (optional)">
          <input value={taxNumber} onChange={(event) => setTaxNumber(event.target.value)} />
        </Field>
      </div>

      <label className="checkbox-row">
        <input checked={preferred} onChange={(event) => setPreferred(event.target.checked)} type="checkbox" />
        Preferred supplier
      </label>

      <div className="sheet-footer">
        <button className="ghost-button" onClick={onClose} type="button">
          Cancel
        </button>
        <button
          className="primary-button"
          disabled={!canSave}
          onClick={() => onSave({ name, category, contactPerson, phone, email, address, taxNumber, preferred, paymentTerms })}
          type="button"
        >
          Add Supplier
        </button>
      </div>
    </Drawer>
  );
}

function StockIssueDrawer({
  inventoryItems,
  onClose,
  onSave,
}: {
  inventoryItems: InventoryItem[];
  onClose: () => void;
  onSave: (values: StockIssueFormValues) => void;
}) {
  const [itemId, setItemId] = useState(inventoryItems[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [department, setDepartment] = useState("");
  const [requestedBy, setRequestedBy] = useState("");
  const [reason, setReason] = useState("");

  const selectedItem = inventoryItems.find((item) => item.id === itemId);
  const canSave = Boolean(itemId && quantity > 0 && department && requestedBy && reason);

  return (
    <Drawer title="Issue Stock" description="Department requests stock from Main Stores; Stores approves and issues it." onClose={onClose}>
      <div className="form-grid">
        <Field label="Item">
          <select value={itemId} onChange={(event) => setItemId(event.target.value)}>
            {inventoryItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} ({item.currentQuantity} {item.unit} in stock)
              </option>
            ))}
          </select>
        </Field>
        <Field label={`Quantity${selectedItem ? ` (${selectedItem.unit})` : ""}`}>
          <input min={1} onChange={(event) => setQuantity(Number(event.target.value))} type="number" value={quantity} />
        </Field>
        <Field label="Department">
          <select value={department} onChange={(event) => setDepartment(event.target.value)}>
            <option value="">Select department...</option>
            {INVENTORY_LOCATIONS.filter((location) => location !== "Main Stores").map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Requested By">
          <input value={requestedBy} onChange={(event) => setRequestedBy(event.target.value)} />
        </Field>
      </div>

      <Field label="Reason">
        <textarea value={reason} onChange={(event) => setReason(event.target.value)} rows={2} placeholder="What is this stock needed for?" />
      </Field>

      {selectedItem && quantity > selectedItem.currentQuantity && (
        <div className="finding-banner blocked">
          Only {selectedItem.currentQuantity} {selectedItem.unit} in stock - inventory cannot go negative.
        </div>
      )}

      <div className="sheet-footer">
        <button className="ghost-button" onClick={onClose} type="button">
          Cancel
        </button>
        <button
          className="primary-button"
          disabled={!canSave}
          onClick={() => onSave({ itemId, quantity, department, requestedBy, reason })}
          type="button"
        >
          Submit Request
        </button>
      </div>
    </Drawer>
  );
}

function StockTransferDrawer({
  inventoryItems,
  onClose,
  onSave,
}: {
  inventoryItems: InventoryItem[];
  onClose: () => void;
  onSave: (values: StockTransferFormValues) => void;
}) {
  const [itemId, setItemId] = useState(inventoryItems[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [fromLocation, setFromLocation] = useState<InventoryLocation>("Main Stores");
  const [toLocation, setToLocation] = useState<InventoryLocation>("Kitchen");
  const [requestedBy, setRequestedBy] = useState("");
  const [reason, setReason] = useState("");

  const canSave = Boolean(itemId && quantity > 0 && fromLocation !== toLocation && requestedBy && reason);

  return (
    <Drawer title="Transfer Stock" description="Move stock between locations, e.g. Main Stores to Kitchen or Bar." onClose={onClose}>
      <div className="form-grid">
        <Field label="Item">
          <select value={itemId} onChange={(event) => setItemId(event.target.value)}>
            {inventoryItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Quantity">
          <input min={1} onChange={(event) => setQuantity(Number(event.target.value))} type="number" value={quantity} />
        </Field>
        <Field label="From">
          <select value={fromLocation} onChange={(event) => setFromLocation(event.target.value as InventoryLocation)}>
            {INVENTORY_LOCATIONS.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </Field>
        <Field label="To">
          <select value={toLocation} onChange={(event) => setToLocation(event.target.value as InventoryLocation)}>
            {INVENTORY_LOCATIONS.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Requested By">
          <input value={requestedBy} onChange={(event) => setRequestedBy(event.target.value)} />
        </Field>
      </div>

      <Field label="Reason">
        <textarea value={reason} onChange={(event) => setReason(event.target.value)} rows={2} />
      </Field>

      {fromLocation === toLocation && <div className="finding-banner blocked">From and To locations must be different.</div>}

      <div className="sheet-footer">
        <button className="ghost-button" onClick={onClose} type="button">
          Cancel
        </button>
        <button
          className="primary-button"
          disabled={!canSave}
          onClick={() => onSave({ itemId, quantity, fromLocation, toLocation, requestedBy, reason })}
          type="button"
        >
          Log Transfer
        </button>
      </div>
    </Drawer>
  );
}

function StockAdjustmentDrawer({
  inventoryItems,
  onClose,
  onSave,
}: {
  inventoryItems: InventoryItem[];
  onClose: () => void;
  onSave: (values: StockAdjustmentFormValues) => void;
}) {
  const [itemId, setItemId] = useState(inventoryItems[0]?.id ?? "");
  const [quantity, setQuantity] = useState(0);
  const [adjustmentReason, setAdjustmentReason] = useState<AdjustmentReason>("Damage");
  const [requestedBy, setRequestedBy] = useState("");
  const [reason, setReason] = useState("");

  const selectedItem = inventoryItems.find((item) => item.id === itemId);
  const canSave = Boolean(itemId && quantity !== 0 && requestedBy && reason);

  return (
    <Drawer title="Adjust Stock" description="Damage, loss, expiry, theft or a manual correction - requires manager approval." onClose={onClose}>
      <div className="form-grid">
        <Field label="Item">
          <select value={itemId} onChange={(event) => setItemId(event.target.value)}>
            {inventoryItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} ({item.currentQuantity} {item.unit} in stock)
              </option>
            ))}
          </select>
        </Field>
        <Field label="Reason">
          <select value={adjustmentReason} onChange={(event) => setAdjustmentReason(event.target.value as AdjustmentReason)}>
            {ADJUSTMENT_REASONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>
        <Field label={`Quantity Change${selectedItem ? ` (${selectedItem.unit})` : ""}`}>
          <input onChange={(event) => setQuantity(Number(event.target.value))} type="number" value={quantity} />
        </Field>
        <Field label="Requested By">
          <input value={requestedBy} onChange={(event) => setRequestedBy(event.target.value)} />
        </Field>
      </div>
      <p className="muted">Use a negative number for stock leaving (damage, loss, theft, expiry) and a positive number for a correction upward.</p>

      <Field label="Notes">
        <textarea value={reason} onChange={(event) => setReason(event.target.value)} rows={2} placeholder="What happened?" />
      </Field>

      <div className="sheet-footer">
        <button className="ghost-button" onClick={onClose} type="button">
          Cancel
        </button>
        <button
          className="primary-button"
          disabled={!canSave}
          onClick={() => onSave({ itemId, quantity, adjustmentReason, requestedBy, reason })}
          type="button"
        >
          Submit for Approval
        </button>
      </div>
    </Drawer>
  );
}

function StockTakeDrawer({
  inventoryItems,
  onClose,
  onSave,
}: {
  inventoryItems: InventoryItem[];
  onClose: () => void;
  onSave: (values: StockTakeFormValues) => void;
}) {
  const [countedBy, setCountedBy] = useState("");
  const [notes, setNotes] = useState("");
  const [counts, setCounts] = useState<number[]>(inventoryItems.map((item) => item.currentQuantity));

  const updateCount = (index: number, value: number) => {
    setCounts((current) => current.map((count, countIndex) => (countIndex === index ? value : count)));
  };

  const varianceCount = inventoryItems.filter((item, index) => counts[index] !== item.currentQuantity).length;
  const canSave = Boolean(countedBy && inventoryItems.length > 0);

  return (
    <Drawer title="New Stock Take" description="Count every active item; variances are flagged automatically." onClose={onClose}>
      <div className="form-grid">
        <Field label="Counted By">
          <input value={countedBy} onChange={(event) => setCountedBy(event.target.value)} />
        </Field>
      </div>

      <section className="checklist-section">
        <h3>Item Count</h3>
        <table className="stock-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Expected</th>
              <th>Counted</th>
              <th>Variance</th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.map((item, index) => {
              const variance = counts[index] - item.currentQuantity;
              return (
                <tr key={item.id} className={variance !== 0 ? "stock-low" : ""}>
                  <td>
                    {item.name}
                    <span className="muted block">{item.unit}</span>
                  </td>
                  <td>{item.currentQuantity}</td>
                  <td>
                    <input className="stock-input" min={0} onChange={(event) => updateCount(index, Number(event.target.value))} type="number" value={counts[index]} />
                  </td>
                  <td className={variance !== 0 ? "stock-low-cell" : ""}>{variance === 0 ? "OK" : variance > 0 ? `+${variance}` : variance}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <Field label="Notes (optional)">
        <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={2} />
      </Field>

      <div className="sheet-footer">
        <button className="ghost-button" onClick={onClose} type="button">
          Cancel
        </button>
        <button
          className="primary-button"
          disabled={!canSave}
          onClick={() =>
            onSave({
              countedBy,
              notes,
              items: inventoryItems.map((item, index) => ({
                itemId: item.id,
                itemName: item.name,
                unit: item.unit,
                expectedQuantity: item.currentQuantity,
                countedQuantity: counts[index],
              })),
            })
          }
          type="button"
        >
          Submit Stock Take {varianceCount > 0 ? `(${varianceCount} variance)` : ""}
        </button>
      </div>
    </Drawer>
  );
}

function StockTakeDetailModal({ stockTake, onClose }: { stockTake: StockTake; onClose: () => void }) {
  return (
    <Modal
      title={`Stock Take - ${stockTake.date}`}
      description={`Counted by ${stockTake.countedBy}${stockTake.approvedBy ? `, approved by ${stockTake.approvedBy}` : ""}`}
      onClose={onClose}
    >
      <table className="stock-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Expected</th>
            <th>Counted</th>
            <th>Variance</th>
          </tr>
        </thead>
        <tbody>
          {stockTake.items.map((line) => {
            const variance = line.countedQuantity - line.expectedQuantity;
            return (
              <tr key={line.itemId} className={variance !== 0 ? "stock-low" : ""}>
                <td>
                  {line.itemName}
                  <span className="muted block">{line.unit}</span>
                </td>
                <td>{line.expectedQuantity}</td>
                <td>{line.countedQuantity}</td>
                <td className={variance !== 0 ? "stock-low-cell" : ""}>{variance === 0 ? "OK" : variance > 0 ? `+${variance}` : variance}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {stockTake.notes && (
        <Field label="Notes">
          <p className="muted">{stockTake.notes}</p>
        </Field>
      )}
      <div className="sheet-footer">
        <button className="ghost-button" onClick={onClose} type="button">
          Close
        </button>
      </div>
    </Modal>
  );
}

type SearchResult = {
  key: string;
  kind: string;
  title: string;
  subtitle: string;
  onSelect: () => void;
};

function buildSearchResults(
  state: DemoState,
  term: string,
  handlers: { goTo: (module: ModuleId) => void; openReservation: (id: string) => void },
): SearchResult[] {
  const query = term.trim().toLowerCase();
  if (!query) return [];

  const results: SearchResult[] = [];

  state.reservations.forEach((reservation) => {
    if (`${reservation.id} ${reservation.guest} ${reservation.organisation} ${reservation.room}`.toLowerCase().includes(query)) {
      results.push({
        key: `res-${reservation.id}`,
        kind: "Reservation",
        title: `${reservation.guest} - ${reservation.id}`,
        subtitle: `Room ${reservation.room} - ${reservation.status}`,
        onSelect: () => {
          handlers.goTo("frontOffice");
          handlers.openReservation(reservation.id);
        },
      });
    }
  });

  state.rooms.forEach((room) => {
    if (`${room.number} ${room.type}`.toLowerCase().includes(query)) {
      results.push({
        key: `room-${room.id}`,
        kind: "Room",
        title: `Room ${room.number}`,
        subtitle: `${room.type} - ${room.status}`,
        onSelect: () => handlers.goTo("frontOffice"),
      });
    }
  });

  state.enquiries.forEach((enquiry) => {
    if (`${enquiry.id} ${enquiry.guest} ${enquiry.request}`.toLowerCase().includes(query)) {
      results.push({
        key: `enq-${enquiry.id}`,
        kind: "Enquiry",
        title: `${enquiry.guest} - ${enquiry.id}`,
        subtitle: enquiry.request,
        onSelect: () => handlers.goTo("frontOffice"),
      });
    }
  });

  state.purchaseRequests.forEach((request) => {
    const itemNames = request.items.map((item) => item.description).join(" ");
    if (`${request.id} ${request.department} ${request.requestedBy} ${itemNames}`.toLowerCase().includes(query)) {
      results.push({
        key: `pr-${request.id}`,
        kind: "Purchase Request",
        title: `${request.id} - ${request.department}`,
        subtitle: request.reason,
        onSelect: () => handlers.goTo("procurement"),
      });
    }
  });

  state.purchaseOrders.forEach((order) => {
    const supplier = state.suppliers.find((item) => item.id === order.supplierId);
    if (`${order.id} ${order.department} ${supplier?.name ?? ""}`.toLowerCase().includes(query)) {
      results.push({
        key: `po-${order.id}`,
        kind: "Purchase Order",
        title: `${order.id} - ${supplier?.name ?? "Unknown supplier"}`,
        subtitle: `${order.department} - due ${order.deliveryDate}`,
        onSelect: () => handlers.goTo("procurement"),
      });
    }
  });

  state.inventoryItems.forEach((item) => {
    if (`${item.id} ${item.name} ${item.category}`.toLowerCase().includes(query)) {
      results.push({
        key: `itm-${item.id}`,
        kind: "Stock Item",
        title: item.name,
        subtitle: `${item.currentQuantity} ${item.unit} in stock - ${item.category}`,
        onSelect: () => handlers.goTo("procurement"),
      });
    }
  });

  state.suppliers.forEach((supplier) => {
    if (`${supplier.id} ${supplier.name} ${supplier.category}`.toLowerCase().includes(query)) {
      results.push({
        key: `sup-${supplier.id}`,
        kind: "Supplier",
        title: supplier.name,
        subtitle: `${supplier.category} - ${supplier.contactPerson}`,
        onSelect: () => handlers.goTo("procurement"),
      });
    }
  });

  state.activities.forEach((booking) => {
    if (`${booking.id} ${booking.activity} ${booking.guest}`.toLowerCase().includes(query)) {
      results.push({
        key: `act-${booking.id}`,
        kind: "Activity",
        title: `${booking.activity} - ${booking.guest}`,
        subtitle: `${booking.time} with ${booking.instructor}`,
        onSelect: () => handlers.goTo("operations"),
      });
    }
  });

  return results.slice(0, 8);
}

function DensityChart({
  rooms,
  reservations,
  highlightDate,
}: {
  rooms: Room[];
  reservations: Reservation[];
  highlightDate?: string;
}) {
  return (
    <div className="density-chart">
      <div className="density-row density-head">
        <div className="room-label">Room</div>
        {dates.map((date) => (
          <div className={`date-cell ${date === highlightDate ? "date-cell-today" : ""}`} key={date}>
            {date}
          </div>
        ))}
      </div>
      {rooms.map((room) => (
        <div className="density-row" key={room.id}>
          <div className="room-label">
            <strong>{room.number}</strong>
            <span>{room.lodge}</span>
          </div>
          {dates.map((date) => {
            const reservation = reservations.find(
              (item) => item.room === room.number && dates.indexOf(date) >= dates.indexOf(item.arrival) && dates.indexOf(date) < dates.indexOf(item.departure),
            );
            const showOperationalStatus = !reservation && date === highlightDate && room.status !== "Available";

            return (
              <div className={`date-cell ${date === highlightDate ? "date-cell-today" : ""}`} key={date}>
                {reservation && (
                  <div
                    className={`booking-pill ${statusClass(reservation.status === "Checked In" ? "Checked In" : reservation.purpose === "Conference Group" ? "Conference Group" : reservation.payment)}`}
                  >
                    {reservation.guest}
                  </div>
                )}
                {showOperationalStatus && (
                  <div className={`booking-pill ${statusClass(room.status)}`}>{room.status === "Dirty" ? "Checkout" : room.status}</div>
                )}
                {!reservation && !showOperationalStatus && room.status === "Maintenance" && date === highlightDate && (
                  <div className="booking-pill maintenance">Maintenance</div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function Badge({ label }: { label: string }) {
  return <span className={`badge ${statusClass(label)}`}>{label}</span>;
}

function statusClass(label: string) {
  return label.toLowerCase().replaceAll(" ", "-");
}

function Attention({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) {
  return (
    <div className="attention-item">
      <Icon size={18} />
      <div>
        <strong>{title}</strong>
        <span>{description}</span>
      </div>
    </div>
  );
}

function AuditList({ audit }: { audit: AuditItem[] }) {
  return (
    <div className="audit-list">
      {audit.map((item) => (
        <div className="audit-item" key={item.id}>
          <span>{item.time}</span>
          <strong>{item.text}</strong>
          <em>{item.user}</em>
        </div>
      ))}
    </div>
  );
}

export default App;
