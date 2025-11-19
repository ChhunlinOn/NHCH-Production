import Image from "next/image";
import React from "react";

export default function NewDetail() {
  return (
    <div
      className="max-w-5xl mx-auto px-4 py-16  "
      style={{ color: "#282828" }}
    >
      <div className="text-center mb-10">
        <h1 className="text-[40px] mb-6 font-bold" style={{ color: "#43A047" }}>
          Improving, Not Abandoning, Residential Orphan Care
        </h1>
        <p className="mb-8">
          There are over 10 million orphaned children worldwide, separated from
          their families by death, abandonment, or displacement. These children
          are among the most vulnerable, facing exploitation, abuse, and
          neglect. This article explains how residential care, when
          well-supported within communities, can be a safe and beneficial place
          for children when returning to family isnt possible.
        </p>
      </div>

      <div className="mb-8 flex justify-center">
        <Image
          src="/detail-image.png"
          alt="Smiling children playing in water"
          width={800}
          height={500}
          className="rounded"
        />
      </div>

      <div className="text-left space-y-6">
        <div>
          <h2 className="text-xl mb-2" style={{ color: "#43A047" }}>
            • Focusing on the Most Vulnerable
          </h2>
          <p>
            At N.H.O., our mission is to support the children who cannot safely
            return to their families or communities. For these children,
            institutional care is often not the solution. Far too often, these
            children are placed in environments that fail to meet their deepest
            need for stability, love, and long-term care. We are convinced that
            these children deserve better—a family-like environment that fosters
            their emotional, mental, and physical development.
          </p>
        </div>

        <div>
          <h2 className="text-xl mb-2" style={{ color: "#43A047" }}>
            • Improving, Not Abandoning, Residential Orphan Care
          </h2>
          <p>
            Rather than abandoning residential orphan care, we believe it must
            be reimagined and improved. We are creating a sustainable model for
            residential care that can be replicated worldwide, empowering
            churches, local communities, and child-care organizations to provide
            safe, loving homes for orphaned children. By transforming
            residential care, we aim to rescue and restore millions of children,
            offering them a future rooted in love and hope—a future in which
            they can grow and thrive as God intended.
          </p>
        </div>

        <div>
          <h2 className="text-xl mb-2" style={{ color: "#43A047" }}>
            • Raising Independent, Impactful Adults
          </h2>
          <p>
            We are not just caring for children—we are preparing them for the
            future. Many children in our care aspire to become independent
            adults who will contribute to their communities. Some already dream
            of working with New Hope Children&#39;s Homes or other ministries to
            help children in need. We believe we are raising the next generation
            of leaders—children who will help rebuild and transform their
            countries from within.
          </p>
        </div>
      </div>
    </div>
  );
}
