import { proxy } from 'valtio'

const state = proxy({
  intro: true,
  disableControl: false,
  currentTab: 'style',
  currentStyleIndex: 0,
  currentDimension: {length: 180, width: 180, height: 60},
  currentMaterialIndex: 0,
  currentPrintSpec: 0,
  currentPrintSurface: 0,
  currentCoating: 0,
  currentFinishingArray: [false, false, false, false, false],
  style: ['mailer', 'sleeve', 'RTE', 'lidandbase', 'Bufferliddark', 'CLB', 'skillet', 'sltray', 'headercard', 'other'],
  initialDimension: [
    {style: 'mailer',        length: 180, width: 180, height: 60},
    {style: 'sleeve',        length: 120, width: 40, height: 120},
    {style: 'RTE',           length: 120, width: 40, height: 120},
    {style: 'lidandbase',    length: 120, width: 40, height: 120},
    {style: 'Bufferliddark', length: 120, width: 40, height: 120},
    {style: 'CLB',           length: 120, width: 40, height: 120},
    {style: 'skillet',       length: 120, width: 40, height: 120},
    {style: 'sltray',        length: 120, width: 40, height: 120},
    {style: 'headercard',    length: 120, width: 40, height: 120},
  ],
  initialMaterial : ['coated', 'uncoated', 'kraft', 'microflute-kraft', 'microflute-white', 'other', 'main'],
  initialPrintSpec: ['color_none', 'black', 'cmyk', 'cmyk-1', 'cmyk-2', 'color_cmykplus1pantonemetflo', 'color_cmykplus2pantonemetflo', 'color_1pantonestd', 'color_2pantonestd', 'color_1pantonemetflo', 'color_2pantonemetflo', 'color_other'],
  initialPrintSurface: ['print-oneside', 'print-outside-inside'],
  initialCoating: ['none', 'gloss', 'satin', 'matt', 'other'],
  initialFinishing: ['none', 'spot-uv', 'foil', 'emboss-deboss', 'other'],
  additionalLights: false,
})

export { state }
