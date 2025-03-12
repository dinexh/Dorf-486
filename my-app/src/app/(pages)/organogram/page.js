'use client'
import './organogram.css'
import Link from 'next/link'

export default function OrganogramPage() {
  const domains = [
    // First row (4)
    "Health & Hygiene",
    "Agriculture",
    "Quality Education",
    "Village Infrastructure",
    // Second row (5)
    "Water conservation",
    "Material and Resources",
    "Social Community Actions",
    "Green Innovation",
    "Women Empowerment"
  ]

  return (
    <div className="organogram-container">
      <div className="organogram-content">
        <div className="top-nav">
          <Link href="/" className="back-button">
            ← Back to Home
          </Link>
        </div>

        <h1 className="organogram-header">Organization Structure</h1>

        <div className="org-chart">
          <div className="level chancellor">
            <div className="node">Chancellor</div>
          </div>

          <div className="level ceo">
            <div className="node">CEO - SVR</div>
          </div>

          <div className="level mentors">
            <div className="node">Mentor 1</div>
            <div className="node">Mentor 2</div>
            <div className="node">Mentor 3</div>
            <div className="node">Mentor 4</div>
          </div>

          <div className="level domains">
            <div className="domains-row-1">
              {domains.slice(0, 4).map((domain, index) => (
                <div key={index} className="node domain">
                  {domain}
                </div>
              ))}
            </div>
            <div className="domains-row-2">
              {domains.slice(4).map((domain, index) => (
                <div key={index + 4} className="node domain">
                  {domain}
                </div>
              ))}
            </div>
          </div>

          {/* <div className="level students">
            <div className="node">Domain Students</div>
          </div> */}
        </div>
      </div>
    </div>
  )
} 