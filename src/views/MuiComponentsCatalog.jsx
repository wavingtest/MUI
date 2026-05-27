import { Box, Typography } from '@mui/material';
import { MUI_COMPONENT_PHASES } from '../data/muiComponentCatalog';
import { PHASE1_DEMO_COMPONENTS } from '../components/showcase/MuiPhase1Demos';
import { PHASE2_DEMO_COMPONENTS } from '../components/showcase/MuiPhase2Demos';
import { PHASE3_DEMO_COMPONENTS } from '../components/showcase/MuiPhase3Demos';

export default function MuiComponentsCatalog() {
  const high = MUI_COMPONENT_PHASES.phase1;
  const medium = MUI_COMPONENT_PHASES.phase2;
  const low = MUI_COMPONENT_PHASES.phase3;

  return (
    <Box sx={{ mb: 4 }}>
      {PHASE1_DEMO_COMPONENTS.map((Demo, index) => (
        <Demo key={high.ids[index] ?? index} />
      ))}

      {PHASE2_DEMO_COMPONENTS.map((Demo, index) => (
        <Demo key={medium.ids[index] ?? index} />
      ))}

      {PHASE3_DEMO_COMPONENTS.map((Demo, index) => (
        <Demo key={low.ids[index] ?? index} />
      ))}
    </Box>
  );
}
