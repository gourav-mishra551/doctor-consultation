import React from 'react'

const ReturnRefunds = () => {
    return (
        <div className='max-w-6xl mx-auto flex flex-col gap-5 sm:p-0 px-10 mt-10'>
            <p className='text-3xl font-bold'>RETURN AND REFUND POLICY</p>
            <div className='h-[1px] w-full bg-gray-400'></div>

            <div>
                <p className='font-bold'>Complaints:</p>
                <p className='font-normal'>Ametheushealth.com has a written complaints policy and procedures. We aim to acknowledge all formal written complaints within two working days of receiving them and to respond to all formal written complaints within five working days of receiving them.</p>
                <div>
                    <p className='font-normal'>To lodge a formal complaint, please send an email to info@ametheushealth.com;  Anyone unhappy with the response that ametheushealth.com has made to a formal written complaint should write an email to info@ametheushealth.com</p>
                </div>
            </div>

            <div>
                <p className='font-bold'>Privacy:</p>
                <p className='font-normal'>Medical data and your order history is completely confidential and will only be viewable by our pharmacy staff. We will never disclose this data unless legally obliged to by law. Ametheushealth.com has a legal obligation to comply with Indian Data Protection legislation. The Ametheushealth.com Purchase Terms and Conditions and Privacy Policy specify how we use confidential patient data.</p>
            </div>

            <div>
                <p className='font-bold'>Cancellation Policy:</p>
                <p className='font-normal'>You as a customer can cancel your order anytime up to the cut-off time of the slot for which you have placed an order by calling our customer service. In such a case we will refund any payments already made by you for the order. If we suspect any fraudulent transaction by any customer or any transaction which defies the terms & conditions of using the website, we at our sole discretion could cancel such orders. We will maintain a negative list of all fraudulent transactions and customers and would deny access to them or cancel any orders placed by them.</p>
            </div>

            <div>
                <p className='font-bold'>Customer cancellation:</p>
                <p className='font-normal'>The customer can cancel the order for the product till Ametheushealth.com ship it. Orders once shipped cannot be cancelled. The customer can cancel the order for medical test till the collection of sample.</p>
            </div>

            <div>
                <p className='font-normal'>Ametheushealth.com cancellation:</p>
                <p className='font-normal'>There may be certain orders that Ametheushealth.com partners are unable to accept and service and these may need to be cancelled. Some situations that may result in your order being cancelled include, non-availability of the product or quantities ordered by you or inaccuracies or errors in pricing information specified by our partners.</p>
                <p className='font-normal'>Ametheushealth.com also reserves the right to cancel any orders if it meets with the below mentioned criteria, which may not be exhaustive, viz:</p>
                <p className='font-normal'>i. Multiple orders placed for same product at the same address;</p>
                <p className='font-normal'>ii. Invalid address given in order details;</p>
                <p className='font-normal'>iii. Any malpractice used to place the order.</p>
                <p className='font-normal'>No cancellation charges shall be levied for cancellation of an order in accordance with the terms of this policy.</p>
            </div>
        </div>
    )
}

export default ReturnRefunds