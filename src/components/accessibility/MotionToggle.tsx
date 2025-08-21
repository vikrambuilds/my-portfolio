
import { useAccessibility } from '../../hooks/useAccessibility';
import { Switch } from '../ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

const MotionToggle = () => {
  const { prefersReducedMotion, toggleReducedMotion } = useAccessibility();
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            <Switch
              checked={prefersReducedMotion}
              onCheckedChange={toggleReducedMotion}
              id="reduced-motion"
              aria-label="Toggle reduced motion"
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Reduce animations</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MotionToggle;
