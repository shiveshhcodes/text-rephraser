import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Tone } from './TextRewriter';

interface ToneSelectorProps {
  tones: Tone[];
  selectedTone: Tone;
  onToneSelect: (tone: Tone) => void;
}

export function ToneSelector({ tones, selectedTone, onToneSelect }: ToneSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Choose Your Tone</h2>
        <p className="text-muted-foreground">
          Select how you want your text to sound
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tones.map((tone) => (
          <Card
            key={tone.id}
            className={cn(
              "tone-button cursor-pointer",
              selectedTone.id === tone.id && "active"
            )}
            onClick={() => onToneSelect(tone)}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl" role="img" aria-label={tone.name}>
                    {tone.icon}
                  </span>
                  <h3 className="font-semibold">{tone.name}</h3>
                </div>
                {selectedTone.id === tone.id && (
                  <Badge variant="default" className="text-xs">
                    Selected
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tone.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}