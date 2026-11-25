import { Box, Button, Stack, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { clicksOf, formatDate, shortLink, stripProtocol } from "../../lib/links";
import { MONO, MUTED_TEXT, OUTLINE } from "../../lib/tokens";
import type { ShortUrl } from "../../types/index";

interface LinksCardListProps {
  urls: ShortUrl[];
  onCopy: (value: string) => void;
}

/** Card view, shown below `md` so nothing scrolls sideways on phones. */
export function LinksCardList({ urls, onCopy }: LinksCardListProps) {
  return (
    <Box sx={{ display: { xs: "block", md: "none" } }}>
      {urls.map((item) => {
        const link = shortLink(item);
        return (
          <Stack
            key={item.id}
            spacing={1}
            sx={{ p: 2, borderBottom: 1, borderColor: OUTLINE, "&:last-child": { borderBottom: 0 } }}
          >
            <Stack direction="row" spacing={1} sx={{ justifyContent: "space-between", alignItems: "center" }}>
              <Typography noWrap sx={{ fontFamily: MONO, fontSize: 13, fontWeight: 500, color: "primary.main" }}>
                {stripProtocol(link)}
              </Typography>
              <Typography sx={{ fontFamily: MONO, fontSize: 12, flexShrink: 0 }}>
                {clicksOf(item).toLocaleString("en-US")} clicks
              </Typography>
            </Stack>
            <Typography noWrap title={item.originalUrl} sx={{ fontSize: 13, color: MUTED_TEXT }}>
              {item.originalUrl}
            </Typography>
            <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ fontSize: 13, color: MUTED_TEXT }}>{formatDate(item.createdAt)}</Typography>
              <Button
                size="small"
                variant="outlined"
                color="inherit"
                startIcon={<ContentCopyIcon sx={{ fontSize: 14 }} />}
                onClick={() => onCopy(link)}
                sx={{ textTransform: "none", borderColor: OUTLINE, borderRadius: "8px", color: MUTED_TEXT, fontSize: 12 }}
              >
                Copy
              </Button>
            </Stack>
          </Stack>
        );
      })}
    </Box>
  );
}
