// Copyright (c) 2025, chinthada prasanna and contributors
// For license information, please see license.txt

frappe.ui.form.on('Leave Application', {
    from_date: function(frm) {
        calculate_days(frm);
    },
    to_date: function(frm) {
        calculate_days(frm);
    }
});

function calculate_days(frm) {
    if (frm.doc.from_date && frm.doc.to_date) {

        // Convert to JS date objects
        let from = new Date(frm.doc.from_date);
        let to = new Date(frm.doc.to_date);

        // Validate
        if (to < from) {
            frappe.msgprint("To Date cannot be before From Date.");
            frm.set_value("to_date", "");
            frm.set_value("total_days", 0);
            return;
        }

        // Calculate total days (inclusive)
        let diff = (to - from) / (1000 * 60 * 60 * 24) + 1;

        frm.set_value("total_days", diff);
    }
}

frappe.ui.form.on('Leave Application', {
    employee: function(frm) {
        if (frm.doc.employee) {
            frappe.db.get_value('Employee', frm.doc.employee, 'employee_name')
                .then(r => {
                    if (r.message) {
                        frm.set_value('employee_name', r.message.employee_name);
                    }
                });
        }
    }
});

frappe.ui.form.on('Leave Application', {
    validate: function(frm) {
        if (frm.doc.leave_type && frm.doc.employee) {
            frappe.call({
                method: "frappe.client.get_value",
                args: {
                    doctype: "Leave Balance",
                    filters: {
                        employee: frm.doc.employee,
                        leave_type: frm.doc.leave_type
                    },
                    fieldname: ["entitlement", "leave_taken", "leave_remaining"]
                },
                callback: function(r) {
                    if (!r.message) return;

                    let remaining = r.message.leave_remaining;

                    if (frm.doc.total_leave_days > remaining) {
                        frappe.validated = false;
                        frappe.msgprint("You do not have enough leave balance.");
                    }
                }
            });
        }
    }
});
