# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:






//for /doctor-onboarding-form this route dfgdf
Hospitals Details
    {step === 2 && (
            <div className="bg-white p-10 rounded-xl shadow-lg">
              <p className="font-semibold text-2xl text-center text-[#00768A] mb-6">
                Hospital Details
              </p>
              <div className="input-group flex flex-col gap-5">
                <div>
                  <label htmlFor="HospitalName" className="text-[#00768A]">
                    Hospital Name
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-[#00768A]"
                    placeholder="Hospital / Clinic Name"
                    name="hospitalName"
                    value={formValues.hospitalName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Permanent Address */}
                <div>
                  <label htmlFor="PermanentAddress" className="text-[#00768A]">
                    Permanent Address
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-[#00768A]"
                    placeholder="Permanent Address"
                    name="clinic_hospital_address.permanentAddress"
                    value={formValues.clinic_hospital_address.permanentAddress}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex gap-5">
                  <div>
                    <label htmlFor="City" className="text-[#00768A]">
                      City:
                    </label>
                    <input
                      type="text"
                      className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-[#00768A]"
                      placeholder="City"
                      name="clinic_hospital_address.city"
                      value={formValues.clinic_hospital_address.city}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="State" className="text-[#00768A]">
                      State:
                    </label>
                    <input
                      type="text"
                      className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-[#00768A]"
                      placeholder="State"
                      name="clinic_hospital_address.state"
                      value={formValues.clinic_hospital_address.state}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="PinCode" className="text-[#00768A]">
                      Pin Code:
                    </label>
                    <input
                      type="text"
                      className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-[#00768A]"
                      placeholder="Pin Code"
                      name="clinic_hospital_address.PinCode"
                      value={formValues.clinic_hospital_address.PinCode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <label className="text-[#00768A]" htmlFor="Hospital Contact">
                    Hospital Contact:
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-[#00768A]"
                    placeholder="Hospital Contact"
                    name="hospital_contact"
                    value={formValues.hospital_contact}
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-3">
                  <label className="text-[#00768A]" htmlFor="Hospital Contact">
                    Hospital Email:
                  </label>
                  <input
                    type="email"
                    className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-[#00768A]"
                    placeholder="Hospital Email"
                    name="hospital_email"
                    value={formValues.hospital_email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="bg-[#00768A] text-white px-6 py-2 rounded-md hover:bg-[#00607A]"
                >
                  Next
                </button>
              </div>
            </div>
          )}"# dr-consultation" 
