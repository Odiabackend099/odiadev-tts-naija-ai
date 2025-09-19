Param([string]$ProjectName='crossai-emergency-pwa')
if(!(Test-Path .env.local)){Copy-Item .env.example .env.local}
if(!(Test-Path node_modules)){npm i}
npm run dev
