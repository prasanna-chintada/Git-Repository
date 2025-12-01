# Copyright (c) 2025, chinthada prasanna and contributors
# For license information, please see license.txt

# import frappe


import frappe
from frappe.utils import today

def execute(filters=None):
    today_date = today()

    columns = [
        {"label": "Employee", "fieldname": "employee", "fieldtype": "Link", "options": "Employee", "width": 150},
        {"label": "Leave Type", "fieldname": "leave_type", "fieldtype": "Data", "width": 120},
        {"label": "From Date", "fieldname": "from_date", "fieldtype": "Date", "width": 100},
        {"label": "To Date", "fieldname": "to_date", "fieldtype": "Date", "width": 100},
        {"label": "Status", "fieldname": "status", "fieldtype": "Data", "width": 90},

        # Hidden numeric field to avoid "no numeric fields" warning
        {"label": "Value", "fieldname": "value", "fieldtype": "Float", "width": 1, "hidden": 1},
    ]

    data = frappe.db.sql("""
        SELECT 
            employee,
            leave_type,
            from_date,
            to_date,
            status,
            1 as value
        FROM `tabLeave Application`
        WHERE status = 'Approved'
        AND from_date <= %s
        AND to_date >= %s
    """, (today_date, today_date), as_dict=True)

    return columns, data
