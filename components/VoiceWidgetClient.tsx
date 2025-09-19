'use client';

import dynamic from 'next/dynamic';

// Dynamically import the voice widget to avoid SSR issues
const VoiceAssistantWidget = dynamic(
  () => import('../src/components/VoiceAssistantWidget'),
  { ssr: false }
);

export default function VoiceWidgetClient() {
  return <VoiceAssistantWidget />;
}
