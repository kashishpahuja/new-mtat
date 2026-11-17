
"use client";

const sections = {
  home: {
    title: "Home Page",
    description: "Manage the content displayed on the MTAT homepage.",
    groups: [
      {
        title: "Hero Section",
        fields: ["Main Heading", "Subheading", "Description", "Button Text", "Button Link", "Banner Image"],
      },
      {
        title: "About Preview",
        fields: ["Section Heading", "Short Description", "Image", "Button Text"],
      },
      {
        title: "Other Homepage Sections",
        fields: ["Industries Heading", "Brands Heading", "Why Choose Us Heading", "CTA Heading"],
      },
    ],
  },

  about: {
    title: "About Us",
    description: "Manage company information, history and expertise.",
    groups: [
      {
        title: "Company Introduction",
        fields: ["Page Heading", "Tagline", "Introduction", "Company Image"],
      },
      {
        title: "Company Profile",
        fields: ["Our History", "Our Mission", "Our Vision", "Our Expertise"],
      },
      {
        title: "Company Highlights",
        fields: ["Established Year", "Team Size", "Years of Experience", "Company Location"],
      },
    ],
  },

  contact: {
    title: "Contact Page",
    description: "Manage contact information and enquiry page content.",
    groups: [
      {
        title: "Contact Information",
        fields: ["Page Heading", "Address", "Phone Number", "Email Address", "Working Hours"],
      },
      {
        title: "Social Links",
        fields: ["LinkedIn URL", "Facebook URL", "Instagram URL", "YouTube URL"],
      },
      {
        title: "Map",
        fields: ["Google Maps Embed URL"],
      },
    ],
  },

  presence: {
    title: "Our Presence",
    description: "Manage locations and geographical presence information.",
    groups: [
      {
        title: "Section Content",
        fields: ["Page Heading", "Description", "Banner Image"],
      },
      {
        title: "Locations",
        fields: ["Location Name", "Address", "Contact Number", "Map URL"],
      },
    ],
  },
};

export default function ContentSection({ section }) {
  const data = sections[section];

  if (!data) return null;

  return (
    <div className="space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#467B23]">
            Website Content
          </p>
          <h1 className="text-2xl font-bold text-[#01193B] sm:text-3xl">
            {data.title}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {data.description}
          </p>
        </div>

        <span className="w-fit rounded-full bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-700">
          API integration pending
        </span>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6 border-b border-gray-100 pb-4">
          <h2 className="font-bold text-[#01193B]">Content Management</h2>
          <p className="mt-1 text-xs text-gray-500">
            These fields are prepared for future content API integration.
          </p>
        </div>

        <div className="space-y-8">
          {data.groups.map((group) => (
            <section key={group.title}>
              <h3 className="mb-4 text-sm font-bold text-[#467B23]">
                {group.title}
              </h3>

              <div className="grid gap-5 sm:grid-cols-2">
                {group.fields.map((field) => {
                  const isLong =
                    ["Description", "Introduction", "Our History", "Our Mission", "Our Vision", "Our Expertise"].some(
                      (word) => field.includes(word)
                    );

                  const isImage = field.includes("Image");

                  return (
                    <div
                      key={field}
                      className={isLong ? "sm:col-span-2" : ""}
                    >
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        {field}
                      </label>

                      {isLong ? (
                        <textarea
                          rows={4}
                          placeholder={`Enter ${field.toLowerCase()}`}
                          disabled
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none"
                        />
                      ) : isImage ? (
                        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-5 text-center text-sm text-gray-400">
                          Image upload will be available after API integration.
                        </div>
                      ) : (
                        <input
                          type="text"
                          placeholder={`Enter ${field.toLowerCase()}`}
                          disabled
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 flex justify-end border-t border-gray-100 pt-5">
          <button
            type="button"
            disabled
            className="cursor-not-allowed rounded-xl bg-[#467B23] px-6 py-3 text-sm font-semibold text-white opacity-50"
          >
            Save Changes — Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
}
