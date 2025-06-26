import { useState } from 'react'
import { Book } from 'lucide-react'

export default function TranscriptSection({ transcript }) {
  const [activeSection, setActiveSection] = useState('intro')

  if (!transcript) return null

  const sections = [
    { id: 'intro', label: 'Intro', data: transcript.stilIntroGroup },
    { id: 's', label: 'S - Sielerus', data: transcript.sOfStil },
    { id: 't', label: 'T - Terugkeer', data: transcript.tOfStil },
    { id: 'i', label: 'I - Intree', data: transcript.iOfStil },
    { id: 'l', label: 'L - Luister', data: transcript.lOfStil },
    { id: 'extro', label: 'Afsluiting', data: transcript.stilExtroGroup }
  ]

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Book className="text-blue-600" size={24} />
        <h2 className="text-xl font-bold text-gray-800">Transcript</h2>
      </div>

      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeSection === section.id
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Active Section Content */}
      <div className="prose prose-blue max-w-none">
        {activeSection === 'intro' && transcript.stilIntroGroup && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {transcript.stilIntroGroup.stilIntroHeader}
            </h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {transcript.stilIntroGroup.stilIntroContent}
            </p>
            {transcript.stilIntroGroup.stilExplanationHeader && (
              <>
                <h4 className="text-md font-semibold text-gray-800 mt-6">
                  {transcript.stilIntroGroup.stilExplanationHeader}
                </h4>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {transcript.stilIntroGroup.stilExplanationContent}
                </p>
              </>
            )}
          </div>
        )}

        {activeSection === 's' && transcript.sOfStil && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {transcript.sOfStil.sHeader}
            </h3>
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">
                {transcript.sOfStil.sQuiteTimeHeader}
              </h4>
              <p className="text-blue-700 leading-relaxed whitespace-pre-line">
                {transcript.sOfStil.sQuiteTimeContent}
              </p>
            </div>
            {transcript.sOfStil.sPsalmHeading && (
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">
                  {transcript.sOfStil.sPsalmHeading}
                </h4>
                <p className="text-purple-700">
                  {transcript.sOfStil.sPsalmIntro} {transcript.sOfStil.sPsalmValue}
                </p>
              </div>
            )}
          </div>
        )}

        {activeSection === 't' && transcript.tOfStil && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {transcript.tOfStil.tHeader}
            </h3>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-green-700 leading-relaxed whitespace-pre-line">
                {transcript.tOfStil.tVerseContent}
              </p>
            </div>
          </div>
        )}

        {activeSection === 'i' && transcript.iOfStil && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {transcript.iOfStil.iOfStilHeader}
            </h3>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">
                {transcript.iOfStil.iStandInForSelfHeading}
              </h4>
              <p className="text-yellow-700 leading-relaxed whitespace-pre-line">
                {transcript.iOfStil.iStandInForSelfContent}
              </p>
            </div>
          </div>
        )}

        {activeSection === 'l' && transcript.lOfStil && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {transcript.lOfStil.lOfStilHeading}
            </h3>
            <div className="bg-indigo-50 rounded-lg p-4">
              <p className="text-indigo-700 leading-relaxed whitespace-pre-line">
                {transcript.lOfStil.lReadTextAgainIntro}
              </p>
            </div>
          </div>
        )}

        {activeSection === 'extro' && transcript.stilExtroGroup && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {transcript.stilExtroGroup.header}
            </h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {transcript.stilExtroGroup.xtroText}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
