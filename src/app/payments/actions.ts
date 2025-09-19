"use server"

type ActionState = { ok: false; message: string } | { ok: true; message: string; ref?: string }

export async function requestMpesaStkPush(_: ActionState | null, formData: FormData): Promise<ActionState> {
  const msisdn = String(formData.get("msisdn") || "").trim()
  const amount = Number(formData.get("amount") || 0)
  const reference = String(formData.get("reference") || "").trim()
  const groupName = String(formData.get("groupName") || "").trim()

  if (!/^2547\d{8}$/.test(msisdn)) {
    return { ok: false, message: "Enter a valid Safaricom number in E.164 format, e.g., 2547XXXXXXXX" }
  }
  if (!amount || amount <= 0) {
    return { ok: false, message: "Enter a valid amount greater than 0" }
  }

  await new Promise((r) => setTimeout(r, 800))
  const ref = `TL-MPESA-${Date.now()}`
  return {
    ok: true,
    message: `STK push sent to ${msisdn}. Approve on your phone to pay ${amount.toLocaleString()} KES${reference ? ` • ${reference}` : ""}${groupName ? ` (to ${groupName})` : ""}.`,
    ref: reference || ref,
  }
}

export async function submitCardPayment(_: ActionState | null, formData: FormData): Promise<ActionState> {
  const token = String(formData.get("token") || "")
  const last4 = String(formData.get("last4") || "")
  const amount = Number(formData.get("amount") || 0)
  const name = String(formData.get("name") || "").trim()
  const exp = String(formData.get("exp") || "").trim()
  const groupName = String(formData.get("groupName") || "").trim()

  if (!token || !last4 || !amount || !name || !exp) {
    return { ok: false, message: "Missing payment details. Please complete the form." }
  }

  await new Promise((r) => setTimeout(r, 900))

  return {
    ok: true,
    message: `Card payment authorized for ${amount.toLocaleString()} KES${groupName ? ` (to ${groupName})` : ""}. Card •••• ${last4}`,
  }
}
