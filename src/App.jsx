import { useEffect, useState } from 'react'
import { getContrastDetails } from './helpers/color-checker.js'
import './helpers/color-checker.js'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config.js'
import './App.css'

function App() {
  const [theme, setTheme] = useState("true")
  const [contrastResponse, setContrastResponse] = useState([])

  const fullConfig = resolveConfig(tailwindConfig);
  const themes = ['true', 'protanopia', 'deuteranopia', 'tritanopia']

  useEffect(() => {
    const savedTheme = localStorage.getItem('colorBlindTheme') || 'true';
    setTheme(savedTheme)
    setContrast(savedTheme);
    document.body.classList.add(savedTheme);
  }, []);

  const switchTheme = (newTheme) => {
    document.body.classList.remove(...themes);
    document.body.classList.add(newTheme);
    setTheme(newTheme);
    localStorage.setItem('colorBlindTheme', newTheme);
    setContrast(newTheme)
  }

  const setContrast = (theme) => {
    const contrastToCheck = [
      [fullConfig.theme.accentColor[theme]["good"], fullConfig.theme.accentColor[theme]["black"], "good"],
      [fullConfig.theme.accentColor[theme]["moderate"], fullConfig.theme.accentColor[theme]["black"], "moderate"],
      [fullConfig.theme.accentColor[theme]["sensitive"], fullConfig.theme.accentColor[theme]["black"], "sensitive"],
      [fullConfig.theme.accentColor[theme]["unhealthy"], fullConfig.theme.accentColor[theme]["white"], "unhealthy"],
      [fullConfig.theme.accentColor[theme]["veryUnhealthy"], fullConfig.theme.accentColor[theme]["white"], "veryUnhealthy"],
      [fullConfig.theme.accentColor[theme]["hazardous"], fullConfig.theme.accentColor[theme]["white"], "hazardous"],
    ]

    const contrastDetails = getContrastDetails(contrastToCheck);

    setContrastResponse(contrastDetails)
  }

  return (
    <>
      <div >
        <h1 className='my-4 text-2xl'>Environmental Protection Agency Air Quality Index Colors (EPA AQI Colors)</h1>
        <div className='w-full flex items-center justify-center'>
          <div className='flex flex-row my-4'>
            {themes.map((t) => {
              return (
                  <div key={t} className='flex flex-col'>
                    <button
                      className={`px-4 py-2`}
                      onClick={() => switchTheme(t)}
                    >{t}</button>
                    <div className={t === theme ? 'border border-black border-b-2' : ''} />
                  </div>
              )
            })}
          </div>
        </div>

        <div className='flex flex-row my-4'>
            {contrastResponse.map((detail, index) => {
              return (
                  <div key={index} className='flex flex-col justify-center w-full'>
                    <div>{detail.ratio}</div>
                    <div className='flex flex-row items-center justify-center space-x-4'>
                      <div style={{background: detail.background, color: detail.foreground}} className={`w-1/3 h-8 border border-black` }>bg</div>
                      <div style={{background: detail.foreground, color: detail.foreground === "#000000" ? 'white' : 'black'}} className={`w-1/3 h-8 border border-black`}>text</div>
                    </div>
                    <div  style={{color: detail.foreground === "#000000" ? 'black' :'white'}} className={`bg-${theme}-${detail.condition}`}> {detail.condition}</div>
                    <div  className={detail['AA Large Text'] === 'PASS' ? 
                              'bg-[#00FF00] border border-black'
                              :
                              'bg-[#FF0000] border border-black'}>AA Large Text: {detail['AA Large Text']}</div>
                    <div  className={detail['AAA Large Text'] === 'PASS' ? 
                              'bg-[#00FF00] border border-black'
                              :
                              'bg-[#FF0000] border border-black'}>AAA Large Text: {detail['AAA Large Text']}</div>
                    <div  className={detail['AA Small Text'] === 'PASS' ? 
                              'bg-[#00FF00] border border-black'
                              :
                              'bg-[#FF0000] border border-black'}>AA Small Text: {detail['AA Small Text']}</div>
                    <div  className={detail['AAA Small Text'] === 'PASS' ? 
                              'bg-[#00FF00] border border-black'
                              :
                              'bg-[#FF0000] border border-black'}>AAA Small Text: {detail['AAA Small Text']}</div>
                  </div>
              )
            })}
          </div>

        <div className={`bg-${theme}-good`}>
          <p className={`text-${theme}-black`}>Green</p>
        </div>
        <div className={`bg-${theme}-moderate`}>
          <p className={`text-${theme}-black`}>Yellow</p>
        </div>
        <div className={`bg-${theme}-sensitive`}>
          <p className={`text-${theme}-black`}>Orange</p>
        </div>
        <div className={`bg-${theme}-unhealthy`}>
          <p className={`text-${theme}-white`}>Red</p>
        </div>
        <div className={`bg-${theme}-veryUnhealthy`}>
          <p className={`text-${theme}-white`}>Purple</p>
        </div>
        <div className={`bg-${theme}-hazardous`}>
          <p className={`text-${theme}-white`}>Brown</p>
        </div>
      </div>
      <div id="table-container" className={`bg-${theme}-header mt-8`}>
        <div className="text-center">
          <strong className="text-white text-[.9rem] sm:text-[1rem] p-[0.5rem]">Air Quality Health Effects for Particle Pollution</strong>
        </div>
        <table
          className="flex-grow text-xs md:text-sm lg:text-base font-medium bg-white border border-black">
          <thead>
          <tr className="bg-[rgb(234,234,234)]">
            <th className="text-center font-black p-1">
              Levels
            </th>
            <th className="text-center font-black p-1">
              Action
            </th>
            <th className="text-center font-black p-1">
              Description
            </th>
          </tr>
      </thead>
          <tbody>
            <tr className="text-center border-b border-black">
              <td className={`px-1 bg-${theme}-good`}>
                Good <br />
                (0-50)
              </td>
              <td className="px-1">No limitations</td>
              <td className="px-1">
                Air quality is satisfactory, and air pollution poses little or no
                risk.
              </td>
            </tr>
            <tr className="text-center border-b border-black">
              <td className={`bg-${theme}-moderate`}>
                Moderate <br />
                (51-100)
              </td>
              <td className="px-1">
                Monitor sensitive groups and limit their vigorous activities.
              </td>
              <td className="px-1">
                Air quality is acceptable. However, there may be a risk for some
                people, particularly those who are unusually sensitive to air
                pollution.
              </td>
            </tr>
            <tr
              className="text-center border-b border-black"
            >
              <td className={`px-1 bg-${theme}-sensitive`}>
                Unhealthy for Sensitive Groups <br />
                (101-150)
              </td>
              <td className="px-1">
                Sensitive groups should remain indoors as much as possible.
              </td>
              <td className="px-1">
                Members of sensitive groups may experience health effects. The
                general public is less likely to be affected.
              </td>
            </tr>
            <tr className="text-center border-b border-black">
              <td className={`px-1 bg-${theme}-unhealthy text-white`}>
                Unhealthy <br />
                (151-200)
              </td>
              <td className="px-1">
                Sensitive groups should remain indoors as much as possible.
                Non-sensitive groups should take more breaks during outdoor
                activities.
              </td>
              <td className="px-1">
                Some members of the general public may experience health effects;
                members of sensitive groups may experience more serious health
                effects.
              </td>
            </tr>
            <tr
              className="text-center border-b border-black"
            >
              <td className={`px-1 bg-${theme}-veryUnhealthy text-white`}>
                Very Unhealthy <br />
                (201-300)
              </td>
              <td className="px-1">
                Sensitive groups should avoid all outdoor activities. Non-sensitive
                groups should avoid intense outdoor activities.
              </td>
              <td className="px-1">
                Health alert: The risk of health effects is increased for everyone.
              </td>
            </tr>
            <tr
              className="text-center border-b border-black"
            >
              <td className={`px-1 bg-${theme}-hazardous text-white`}>
                Hazardous <br />
                (301+)
              </td>
              <td className="px-1">
                Everyone should avoid all outdoor physical activity.
              </td>
              <td className="px-1">
                Health warning of emergency conditions: everyone is more likely to
                be affected.
              </td>
            </tr>
          </tbody>
        </table>
    </div>
    </>
  )
}

export default App
