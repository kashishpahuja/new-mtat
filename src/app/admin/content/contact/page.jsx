
"use client";

import { useEffect, useState } from "react";
import {
  FiSave,
  FiUpload,
  FiPlus,
  FiTrash2,
  FiRefreshCw,
  FiExternalLink,
  FiEye,
  FiEyeOff,
  FiPhone,
  FiMail,
  FiMapPin,
  FiGlobe,
} from "react-icons/fi";

import { apiRequest } from "../../../lib/adminApi";

const DEFAULT_DATA = {
  hero: {
    eyebrow: "ENGINEERING PRECISION · POWERING PROGRESS",
    title: "One Stop Solution Providers.",
    description:
      "Connect with our team for precision machinery, sales, service, and spare parts assistance.",
    buttonText: "Get In Touch",
    buttonLink: "#contact-section",
    image: "/Images/contact.webp",
  },

  contactInfo: {
    label: "CONTACT US",
    heading: "Get In Touch",
    description:
      "Reach out directly via phone or email, or connect with our team to discuss your machinery and technical requirements.",
    phones: [
      { label: "Phone 1", number: "0160-4624748" },
      { label: "Phone 2", number: "0160-4635748" },
      { label: "Phone 3", number: "0160-4634748" },
    ],
    email: "info@mtaindia.in",
    address: "Ludhiana, Punjab, India",
  },

  quickLinks: [
    { label: "About", url: "/about" },
    { label: "Strength", url: "/about#our-journey" },
    { label: "Our Presence", url: "/our-presence" },
    { label: "Contact", url: "/contact" },
  ],

  socials: [
    {
      platform: "Facebook",
      url: "https://www.facebook.com/people/MTAT-Technologies-Private-Limited/61562506565764/",
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/mtattpl/",
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/",
    },
    {
      platform: "YouTube",
      url: "https://www.youtube.com/@mtatpl",
    },
  ],

  enquiry: {
     recipientEmail: "info@mtaindia.in",
    eyebrow: "SEND AN ENQUIRY",
    heading: "Let's Discuss Your Requirements",
    buttonText: "Submit Enquiry",
    successTitle: "Thank You!",
    successMessage:
      "Your message has been received. Our team will get back to you shortly.",
    nameLabel: "Your Name",
    emailLabel: "Email Address",
    phoneLabel: "Phone Number",
    messageLabel: "Message / Requirements",
    namePlaceholder: "Enter your name",
    emailPlaceholder: "Enter your email",
    phonePlaceholder: "Enter your phone number",
    messagePlaceholder:
      "Tell us about the machinery or services you need...",
  },

  map: {
    title: "MTAT Technologies Location Map",
    embedUrl:
      "https://www.google.com/maps?q=MTAT+Technologies+Ludhiana&output=embed",
  },

  isPublished: true,
};

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#467B23] focus:ring-2 focus:ring-[#467B23]/10";

const labelClass =
  "mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500";

const cardClass =
  "rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6";

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || label}
        className={inputClass}
      />
    </div>
  );
}

function TextAreaField({ label, value, onChange, rows = 4 }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <textarea
        rows={rows}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} resize-y`}
      />
    </div>
  );
}

function SectionHeading({ icon: Icon, title, description }) {
  return (
    <div className="mb-6 flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#467B23]/10 text-[#467B23]">
        <Icon size={19} />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-[#01193B]">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function ArrayActions({ onAdd, label = "Add Item" }) {
  return (
    <button
      type="button"
      onClick={onAdd}
      className="inline-flex items-center gap-2 rounded-lg border border-[#467B23]/30 px-4 py-2.5 text-sm font-semibold text-[#467B23] transition hover:bg-[#467B23]/5"
    >
      <FiPlus />
      {label}
    </button>
  );
}

function ContactContentSection() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("hero");

  const tabs = [
    { id: "hero", label: "Hero Banner" },
    { id: "contact", label: "Contact Details" },
    { id: "links", label: "Quick Links" },
    { id: "socials", label: "Social Media" },
    { id: "enquiry", label: "Enquiry Form" },
    { id: "map", label: "Google Map" },
  ];



const loadContent = async () => {
  try {
    setLoading(true);
    setError("");

    const response = await apiRequest("/contact/admin");

    const savedData =
      response.data?.contactPage ||
      response.data ||
      response.contactPage ||
      response.page ||
      response;

    setData({
      ...DEFAULT_DATA,
      ...savedData,

   
hero: {
  ...DEFAULT_DATA.hero,
  ...(savedData.hero || {}),
  image:
    savedData.hero?.image ||
    savedData.hero?.backgroundImage ||
    DEFAULT_DATA.hero.image,
  backgroundImage:
    savedData.hero?.image ||
    savedData.hero?.backgroundImage ||
    DEFAULT_DATA.hero.image,
},


      contactInfo: {
        ...DEFAULT_DATA.contactInfo,
        ...(savedData.contactInfo || {}),
        phones: Array.isArray(savedData.contactInfo?.phones)
          ? savedData.contactInfo.phones
          : DEFAULT_DATA.contactInfo.phones,
      },

      quickLinks: Array.isArray(savedData.quickLinks)
        ? savedData.quickLinks
        : DEFAULT_DATA.quickLinks,

      socials: Array.isArray(savedData.socials)
        ? savedData.socials
        : DEFAULT_DATA.socials,

      enquiry: {
        ...DEFAULT_DATA.enquiry,
        ...(savedData.enquiry || {}),
      },

      map: {
        ...DEFAULT_DATA.map,
        ...(savedData.map || {}),
      },

      isPublished:
        typeof savedData.isPublished === "boolean"
          ? savedData.isPublished
          : DEFAULT_DATA.isPublished,
    });
  } catch (err) {
    setError(err.message || "Unable to load Contact page content.");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadContent();
  }, []);

  const updateSection = (section, field, value) => {
    setData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };


const updateArrayItem = (section, index, field, value) => {
  setData((prev) => ({
    ...prev,
    [section]: Array.isArray(prev[section])
      ? prev[section].map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        )
      : [],
  }));
};

const addArrayItem = (section, item) => {
  setData((prev) => ({
    ...prev,
    [section]: [
      ...(Array.isArray(prev[section]) ? prev[section] : []),
      item,
    ],
  }));
};

const removeArrayItem = (section, index) => {
  setData((prev) => ({
    ...prev,
    [section]: Array.isArray(prev[section])
      ? prev[section].filter((_, i) => i !== index)
      : [],
  }));
};



const uploadHeroImage = async (file) => {
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    setError("Please select a valid image.");
    return;
  }

  try {
    setUploading(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fieldName", "contact-hero-image");

    const response = await apiRequest("/uploads", {
      method: "POST",
      body: formData,
    });

    // Support different upload response structures.
    const imageUrl =
      response?.url ||
      response?.data?.url ||
      response?.data?.file?.url ||
      response?.file?.url;

    if (!imageUrl || typeof imageUrl !== "string") {
      console.error("Upload response:", response);
      throw new Error("Image URL was not returned by the server.");
    }

    // Update both fields.
    setData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        image: imageUrl,
        backgroundImage: imageUrl,
      },
    }));

    setSuccess("Image uploaded. Click Save Changes to publish it.");
  } catch (err) {
    console.error("Hero image upload error:", err);
    setError(err.message || "Image upload failed.");
  } finally {
    setUploading(false);
  }
};



const handleSave = async () => {
  try {
    setSaving(true);
    setError("");
    setSuccess("");

    const image =
      data.hero.image ||
      data.hero.backgroundImage;

    const payload = {
      ...data,
      hero: {
        ...data.hero,
        image,
        backgroundImage: image,
      },
    };

    const response = await apiRequest("/contact/admin", {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    if (response.success === false) {
      throw new Error(
        response.message || "Unable to save Contact page."
      );
    }

    // Refresh admin data from database.
    await loadContent();

    setSuccess("Contact page updated successfully.");
  } catch (err) {
    setError(err.message || "Unable to save Contact page.");
  } finally {
    setSaving(false);
  }
};


  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <FiRefreshCw className="animate-spin" size={18} />
          Loading Contact page content...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f8fa] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#467B23]">
              <FiGlobe />
              Website Content
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-[#01193B] sm:text-3xl">
              Contact Page
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage contact information, enquiry form, social links and
              page banner.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={loadContent}
              disabled={saving || uploading}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
              <FiRefreshCw />
              Reload
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving || uploading}
              className="inline-flex items-center gap-2 rounded-lg bg-[#467B23] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#365e1b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiSave />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Notifications */}
        {error && (
          <div className="mb-5 flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <span>{error}</span>
            <button type="button" onClick={() => setError("")}>
              ×
            </button>
          </div>
        )}

        {success && (
          <div className="mb-5 flex items-center justify-between gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            <span>{success}</span>
            <button type="button" onClick={() => setSuccess("")}>
              ×
            </button>
          </div>
        )}

        {/* Publication Status */}
        <div className={`${cardClass} mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center`}>
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
              data.isPublished
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700"
            }`}>
              {data.isPublished ? <FiEye /> : <FiEyeOff />}
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Page Visibility
              </p>
              <p className="text-xs text-slate-500">
                {data.isPublished
                  ? "Contact page is published."
                  : "Contact page is unpublished."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setData((prev) => ({
                ...prev,
                isPublished: !prev.isPublished,
              }))
            }
            className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
              data.isPublished
                ? "bg-green-50 text-green-700 hover:bg-green-100"
                : "bg-amber-50 text-amber-700 hover:bg-amber-100"
            }`}
          >
            {data.isPublished ? "Published" : "Unpublished"}
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-6 overflow-x-auto rounded-xl border border-slate-200 bg-white p-2">
          <div className="flex min-w-max gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                  activeTab === tab.id
                    ? "bg-[#01193B] text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* HERO */}
        {activeTab === "hero" && (
          <div className={cardClass}>
            <SectionHeading
              icon={FiGlobe}
              title="Hero Banner"
              description="Edit the main banner displayed at the top of the Contact page."
            />

            <div className="grid gap-6 lg:grid-cols-2">
              <Field
                label="Eyebrow Text"
                value={data.hero.eyebrow}
                onChange={(v) => updateSection("hero", "eyebrow", v)}
              />

              <Field
                label="Main Heading"
                value={data.hero.title}
                onChange={(v) => updateSection("hero", "title", v)}
              />

              <div className="lg:col-span-2">
                <TextAreaField
                  label="Hero Description"
                  value={data.hero.description}
                  onChange={(v) =>
                    updateSection("hero", "description", v)
                  }
                />
              </div>

              <Field
                label="Button Text"
                value={data.hero.buttonText}
                onChange={(v) =>
                  updateSection("hero", "buttonText", v)
                }
              />

              <Field
                label="Button Link"
                value={data.hero.buttonLink}
                onChange={(v) =>
                  updateSection("hero", "buttonLink", v)
                }
              />

              <div className="lg:col-span-2">
                <label className={labelClass}>Hero Background Image</label>

                <div className="overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3">
                  {data.hero.image && (
                    <img
                      src={data.hero.image}
                      alt="Contact hero preview"
                      className="mb-4 h-56 w-full rounded-lg object-cover"
                    />
                  )}

                  <div className="flex flex-wrap items-center gap-3">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#01193B] px-4 py-3 text-sm font-medium text-white hover:bg-[#00346f]">
                      <FiUpload />
                      {uploading ? "Uploading..." : "Upload Image"}
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        disabled={uploading}
                        onChange={(e) => {
                          uploadHeroImage(e.target.files?.[0]);
                          e.target.value = "";
                        }}
                      />
                    </label>

                    <span className="text-xs text-slate-500">
                      JPG, PNG or WebP
                    </span>
                  </div>

                  <div className="mt-4">
                    <Field
                      label="Or Image URL"
                      value={data.hero.image}
                      onChange={(v) =>
                        updateSection("hero", "image", v)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTACT DETAILS */}
        {activeTab === "contact" && (
          <div className="space-y-6">
            <div className={cardClass}>
              <SectionHeading
                icon={FiPhone}
                title="Contact Information"
                description="Manage the heading and introductory content of your contact information section."
              />

              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="Section Label"
                  value={data.contactInfo.label}
                  onChange={(v) =>
                    updateSection("contactInfo", "label", v)
                  }
                />

                <Field
                  label="Section Heading"
                  value={data.contactInfo.heading}
                  onChange={(v) =>
                    updateSection("contactInfo", "heading", v)
                  }
                />

                <div className="md:col-span-2">
                  <TextAreaField
                    label="Description"
                    value={data.contactInfo.description}
                    onChange={(v) =>
                      updateSection("contactInfo", "description", v)
                    }
                  />
                </div>
              </div>
            </div>

            <div className={cardClass}>
              <SectionHeading
                icon={FiPhone}
                title="Phone Numbers"
                description="Add, edit or remove the displayed phone numbers."
              />

              <div className="space-y-4">
                {data.contactInfo.phones.map((phone, index) => (
                  <div
                    key={index}
                    className="grid gap-4 rounded-lg border border-slate-200 p-4 sm:grid-cols-[1fr_1fr_auto]"
                  >
              <Field
  label="Label"
  value={phone.label}
  onChange={(v) =>
    setData((prev) => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        phones: prev.contactInfo.phones.map((item, i) =>
          i === index ? { ...item, label: v } : item
        ),
      },
    }))
  }
/>

                    <Field
                      label="Phone Number"
                      value={phone.number}
                      onChange={(v) =>
                        setData((prev) => ({
                          ...prev,
                          contactInfo: {
                            ...prev.contactInfo,
                            phones: prev.contactInfo.phones.map(
                              (item, i) =>
                                i === index
                                  ? { ...item, number: v }
                                  : item
                            ),
                          },
                        }))
                      }
                    />

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() =>
                          setData((prev) => ({
                            ...prev,
                            contactInfo: {
                              ...prev.contactInfo,
                              phones: prev.contactInfo.phones.filter(
                                (_, i) => i !== index
                              ),
                            },
                          }))
                        }
                        className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100"
                        aria-label="Remove phone number"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <ArrayActions
                  label="Add Phone Number"
                  onAdd={() =>
                    setData((prev) => ({
                      ...prev,
                      contactInfo: {
                        ...prev.contactInfo,
                        phones: [
                          ...prev.contactInfo.phones,
                          { label: "New Phone", number: "" },
                        ],
                      },
                    }))
                  }
                />
              </div>
            </div>

            <div className={cardClass}>
              <SectionHeading
                icon={FiMail}
                title="Email & Address"
                description="Update the primary email and business location."
              />

              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="Email Address"
                  type="email"
                  value={data.contactInfo.email}
                  onChange={(v) =>
                    updateSection("contactInfo", "email", v)
                  }
                />

                <Field
                  label="Business Address"
                  value={data.contactInfo.address}
                  onChange={(v) =>
                    updateSection("contactInfo", "address", v)
                  }
                />
              </div>
            </div>
          </div>
        )}

        {/* QUICK LINKS */}
        {activeTab === "links" && (
          <div className={cardClass}>
            <SectionHeading
              icon={FiExternalLink}
              title="Quick Links"
              description="Manage the internal navigation links displayed on the Contact page."
            />

            <div className="space-y-4">
              {data.quickLinks.map((item, index) => (
                <div
                  key={index}
                  className="grid gap-4 rounded-lg border border-slate-200 p-4 sm:grid-cols-[1fr_2fr_auto]"
                >
                  <Field
                    label="Link Label"
                    value={item.label}
                    onChange={(v) =>
                      updateArrayItem("quickLinks", index, "label", v)
                    }
                  />

                  <Field
                    label="URL"
                    value={item.url}
                    onChange={(v) =>
                      updateArrayItem("quickLinks", index, "url", v)
                    }
                  />

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() =>
                        removeArrayItem("quickLinks", index)
                      }
                      className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100"
                      aria-label="Remove link"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <ArrayActions
                label="Add Quick Link"
                onAdd={() =>
                  addArrayItem("quickLinks", {
                    label: "",
                    url: "",
                  })
                }
              />
            </div>
          </div>
        )}

        {/* SOCIAL LINKS */}
        {activeTab === "socials" && (
          <div className={cardClass}>
            <SectionHeading
              icon={FiGlobe}
              title="Social Media Links"
              description="Update the social media profiles displayed on the Contact page."
            />

            <div className="space-y-4">
              {data.socials.map((item, index) => (
                <div
                  key={index}
                  className="grid gap-4 rounded-lg border border-slate-200 p-4 sm:grid-cols-[1fr_2fr_auto]"
                >
                  <Field
                    label="Platform"
                    value={item.platform}
                    onChange={(v) =>
                      updateArrayItem("socials", index, "platform", v)
                    }
                  />

                  <Field
                    label="Profile URL"
                    value={item.url}
                    onChange={(v) =>
                      updateArrayItem("socials", index, "url", v)
                    }
                  />

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => removeArrayItem("socials", index)}
                      className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100"
                      aria-label="Remove social link"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <ArrayActions
                label="Add Social Profile"
                onAdd={() =>
                  addArrayItem("socials", {
                    platform: "",
                    url: "",
                  })
                }
              />
            </div>
          </div>
        )}

        {/* ENQUIRY */}
        {activeTab === "enquiry" && (
          <div className={cardClass}>
            <SectionHeading
              icon={FiMail}
              title="Enquiry Form Content"
              description="Edit the text, labels, placeholders and success message shown in your enquiry form."
            />

            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2 rounded-xl border border-[#467B23]/20 bg-[#467B23]/5 p-4">
  <div className="mb-3 flex items-center gap-2">
    <FiMail className="text-[#467B23]" size={18} />
    <h3 className="text-sm font-semibold text-[#01193B]">
      Enquiry Email Recipient
    </h3>
  </div>

  <Field
  label="Send Enquiries To (Gmail / Email Address)"
  type="email"
  value={data.enquiry.recipientEmail || ""}
  onChange={(v) =>
    updateSection("enquiry", "recipientEmail", v)
  }
  placeholder="example@gmail.com"
/>

  <p className="mt-2 text-xs text-slate-500">
    All contact form submissions will be sent to this email address.
  </p>
</div>
              <Field
                label="Section Eyebrow"
                value={data.enquiry.eyebrow}
                onChange={(v) => updateSection("enquiry", "eyebrow", v)}
              />

              <Field
                label="Section Heading"
                value={data.enquiry.heading}
                onChange={(v) => updateSection("enquiry", "heading", v)}
              />

              <Field
                label="Submit Button Text"
                value={data.enquiry.buttonText}
                onChange={(v) =>
                  updateSection("enquiry", "buttonText", v)
                }
              />

              <Field
                label="Success Heading"
                value={data.enquiry.successTitle}
                onChange={(v) =>
                  updateSection("enquiry", "successTitle", v)
                }
              />

              <div className="md:col-span-2">
                <TextAreaField
                  label="Success Message"
                  value={data.enquiry.successMessage}
                  onChange={(v) =>
                    updateSection("enquiry", "successMessage", v)
                  }
                />
              </div>

              <Field
                label="Name Field Label"
                value={data.enquiry.nameLabel}
                onChange={(v) =>
                  updateSection("enquiry", "nameLabel", v)
                }
              />

              <Field
                label="Name Placeholder"
                value={data.enquiry.namePlaceholder}
                onChange={(v) =>
                  updateSection("enquiry", "namePlaceholder", v)
                }
              />

              <Field
                label="Email Field Label"
                value={data.enquiry.emailLabel}
                onChange={(v) =>
                  updateSection("enquiry", "emailLabel", v)
                }
              />

              <Field
                label="Email Placeholder"
                value={data.enquiry.emailPlaceholder}
                onChange={(v) =>
                  updateSection("enquiry", "emailPlaceholder", v)
                }
              />

              <Field
                label="Phone Field Label"
                value={data.enquiry.phoneLabel}
                onChange={(v) =>
                  updateSection("enquiry", "phoneLabel", v)
                }
              />

              <Field
                label="Phone Placeholder"
                value={data.enquiry.phonePlaceholder}
                onChange={(v) =>
                  updateSection("enquiry", "phonePlaceholder", v)
                }
              />

              <Field
                label="Message Field Label"
                value={data.enquiry.messageLabel}
                onChange={(v) =>
                  updateSection("enquiry", "messageLabel", v)
                }
              />

              <Field
                label="Message Placeholder"
                value={data.enquiry.messagePlaceholder}
                onChange={(v) =>
                  updateSection("enquiry", "messagePlaceholder", v)
                }
              />
            </div>
          </div>
        )}

        {/* MAP */}
        {activeTab === "map" && (
          <div className={cardClass}>
            <SectionHeading
              icon={FiMapPin}
              title="Google Map"
              description="Manage the Google Maps embed displayed on the Contact page."
            />

            <div className="space-y-5">
              <Field
                label="Map Title"
                value={data.map.title}
                onChange={(v) => updateSection("map", "title", v)}
              />

              <TextAreaField
                label="Google Maps Embed URL"
                value={data.map.embedUrl}
                onChange={(v) => updateSection("map", "embedUrl", v)}
                rows={3}
              />

              {data.map.embedUrl && (
                <div>
                  <label className={labelClass}>Map Preview</label>

                  <div className="h-[350px] overflow-hidden rounded-xl border border-slate-200">
                    <iframe
                      src={data.map.embedUrl}
                      title={data.map.title || "Location map preview"}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bottom Save */}
        <div className="mt-6 flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center">
          <p className="text-sm text-slate-500">
            Remember to save your changes before leaving this page.
          </p>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving || uploading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#467B23] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#365e1b] disabled:opacity-50"
          >
            <FiSave />
            {saving ? "Saving..." : "Save Contact Page"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactContentSection;
