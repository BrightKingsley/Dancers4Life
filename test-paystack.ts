import PrimaryButton from "../../../components/Button/PrimaryButton";
import Logo from "../../../assets/Logo.svg";
import { PaystackButton } from "react-paystack";
import { InvoiceDetails } from "../../../types/InvoiceTypes";
import dayjs from "dayjs";
import { convertFigureToCurrency } from "../../../utils/formatter";
import { InvoiceItems } from "./Invoices";

export type PaystackResponse = {
  reference: string;
  trans: string;
  status: string;
  message: string;
  transaction: string;
  trxref: string;
  redirecturl: string;
};

export type PreviewProps = {
  invoice: InvoiceDetails;
  onProceed?: any;
};

const PreviewCustomerInvoice = ({ invoice, onProceed }: PreviewProps) => {
  const config = {
    reference: new Date().getTime().toString(),
    email: invoice?.customer?.email as string,
    name: invoice?.customer?.full_name as string,
    publicKey: import.meta.env.VITE_PAYSTACK_KEY as string,
  };

  const handlePaystackSuccessAction = (reference: PaystackResponse) => {
    // Create user subscription after paystack is successful
    // trxref
    onProceed(reference);
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const componentProps = {
    ...config,
    text: "Pay for invoice",
    className: "bg-primary",
    onSuccess: (reference: PaystackResponse) =>
      handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  return (
    <>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-[30px]">
          <div>
            <img src={Logo} width="60" alt="invoice logo" />
          </div>
          <div>
            <h4 className="text-[#313131] text-[1.75rem] font-[500]">
              Invoice
            </h4>
          </div>
        </div>

        {/* Business Details */}
        <div className="mb-[40px]">
          <h4 className="text-[#313131] font-[600] text-[1rem]">
            {invoice?.business?.name}
          </h4>
          <div className="flex items-start justify-between gap-[20px]">
            {/* <div className="max-w-[50%] w-full">
              <p className="text-[#313131] text-[0.875rem]">Address</p>
              <p className="text-[#313131] text-[0.875rem]">
                City, state, postal code
              </p>
              <p className="text-[#313131] text-[0.875rem]">Phone</p>
              <p className="text-[#313131] text-[0.875rem]">Email</p>
            </div> */}
            <div className="max-w-[50%] w-full text-left">
              <p className="text-[#313131] text-[0.875rem]">
                Invoice: {invoice?.invoice_number}
              </p>
              <p className="text-[#313131] text-[0.875rem]">
                Invoice date:{" "}
                {dayjs(invoice?.created_at).format("MMM DD, YYYY")}
              </p>
              <p className="text-[#313131] text-[0.875rem]">
                Due date: {dayjs(invoice?.next_due_date).format("MMM DD, YYYY")}
              </p>
              <p className="text-[#313131] text-[0.875rem]">
                Invoice status:{" "}
                <span
                  className={`${
                    invoice?.invoice_status?.toLowerCase() === "overdue" &&
                    "text-[#FF3B2D]"
                  } ${
                    invoice?.invoice_status?.toLowerCase() === "cancelled" &&
                    "text-[#FF3B2D]"
                  } ${
                    invoice?.invoice_status?.toLowerCase() === "pending" &&
                    "text-[#FF3B2D]"
                  } ${
                    invoice?.invoice_status?.toLowerCase() === "paid" &&
                    "text-primary"
                  } capitalize`}
                >
                  {invoice?.invoice_status}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Business Address */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-[20px] mb-[40px]">
          <div className="max-w-[100%] md:max-w-[50%] w-full">
            <h5 className="text-[#313131] text-[1rem] font-[600]">Bill To</h5>
            <p className="text-[#313131] text-[0.875rem]">
              {invoice?.customer?.company_name}
            </p>
            <p className="text-[#313131] text-[0.875rem]">Address</p>
            <p className="text-[#313131] text-[0.875rem]">
              City, state, postal code
            </p>
            <p className="text-[#313131] text-[0.875rem]">
              {invoice?.customer?.mobile_number}
            </p>
            <p className="text-[#313131] text-[0.875rem]">
              {invoice?.customer?.email}
            </p>
          </div>

          <div className="max-w-[100%] md:max-w-[50%] w-full text-left md:text-right">
            <h5 className="text-[#313131] text-[1rem] font-[600]">Ship To</h5>
            <p className="text-[#313131] text-[0.875rem]">
              {invoice?.customer?.company_name}
            </p>
            <p className="text-[#313131] text-[0.875rem]">Address</p>
            <p className="text-[#313131] text-[0.875rem]">
              City, state, postal code
            </p>
            <p className="text-[#313131] text-[0.875rem]">
              {invoice?.customer?.mobile_number}
            </p>
            <p className="text-[#313131] text-[0.875rem]">
              {invoice?.customer?.email}
            </p>
          </div>
        </div>

        {/* Items */}
        <div className="space-y-4 overflow-x-auto overflow-y-hidden w-full mb-[40px]">
          <table className="w-full overflow-x-auto overflow-y-hidden">
            <thead className="sticky z-10 py-3 top-[2px] text-body-text px-[12px] py-[20px]">
              <tr className="py-3 px-3 text-left text-[0.875rem]">
                <th className="py-3 px-4 bg-[#3131310d]">INVENTORY</th>
                <th className="py-3 px-4 bg-[#3131310d]">QTY</th>
                <th className="py-3 px-4 bg-[#3131310d]">UNIT PRICE</th>
                <th className="py-3 px-4 bg-[#3131310d]">DISC(%)</th>
                <th className="py-3 px-4 bg-[#3131310d]">AMOUNT</th>
                <th className="py-3 px-4 bg-[#3131310d]"></th>
              </tr>
            </thead>
            <tbody className="text-base-black px-[12px] py-[20px]">
              {/* return ( */}
              {invoice.invoice_items.map(
                (items: InvoiceItems, index: number) => {
                  return (
                    <tr className="relative cursor-pointer hover:bg-base-black/5 outline-1 text-[0.875rem]">
                      <td>{items?.item_name}</td>
                      <td>{items?.quantity}</td>
                      <td>{convertFigureToCurrency(items?.item_price)}</td>
                      <td>{items?.discount}</td>
                      <td>{convertFigureToCurrency(invoice?.total_amount)}</td>
                    </tr>
                  );
                }
              )}

              <tr className="border-t-[1px] border-[#CECECE] mt-2 text-[0.875rem]">
                <td>Subtotal</td>
                <td></td>
                <td></td>
                <td></td>
                <td className="">
                  {convertFigureToCurrency(
                    Number(invoice?.total_amount) -
                      Number(invoice?.shipping_fee)
                  )}
                </td>
                <td></td>
              </tr>
              <tr className="text-[0.875rem]">
                <td>Shipping</td>
                <td></td>
                <td></td>
                <td></td>
                <td className="">
                  {convertFigureToCurrency(invoice?.shipping_fee)}
                </td>
                <td></td>
              </tr>
              <tr className="text-[0.875rem] font-bold uppercase">
                <td>Total</td>
                <td></td>
                <td></td>
                <td></td>
                <td className="">
                  {convertFigureToCurrency(invoice?.total_amount)}
                </td>
                <td></td>
              </tr>
              {/* ); */}
            </tbody>
          </table>

          <div>
            {invoice?.terms_and_conditions && (
              <div className="mt-[24px]">
                <h4 className="text-[#313131]">Terms & Conditions</h4>
                <p className="text-[#313131]">
                  {invoice?.terms_and_conditions}
                </p>
              </div>
            )}
          </div>
        </div>

        {invoice?.invoice_status?.toLowerCase() !== "paid" && (
          <div className="flex items-center justify-center">
            <PaystackButton
              {...componentProps}
              amount={Number(invoice?.total_amount) * 100}
              className="bg-primary flex items-center justify-center inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md hover:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
            ></PaystackButton>
          </div>
        )}
      </div>
    </>
  );
};

export default PreviewCustomerInvoice;
