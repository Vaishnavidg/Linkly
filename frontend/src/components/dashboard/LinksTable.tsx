import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { clicksOf, formatDate, shortLink, stripProtocol } from "../../lib/links";
import { MONO, MUTED_TEXT, OUTLINE, PAGE_BG, iconButtonSx } from "../../theme/tokens";
import type { ShortUrl } from "../../types/index";

const headCellSx = {
  py: 1.5,
  px: 2,
  fontSize: 12,
  fontWeight: 500,
  color: MUTED_TEXT,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  borderColor: OUTLINE,
  bgcolor: PAGE_BG,
} as const;

const bodyCellSx = { py: 1.75, px: 2 } as const;

interface LinksTableProps {
  urls: ShortUrl[];
  onCopy: (value: string) => void;
}

/** Table view, shown from `md` up. */
export function LinksTable({ urls, onCopy }: LinksTableProps) {
  return (
    <TableContainer sx={{ display: { xs: "none", md: "block" } }}>
      <Table sx={{ "& .MuiTableCell-root": { borderColor: OUTLINE } }}>
        <TableHead>
          <TableRow>
            <TableCell sx={headCellSx}>Shortened URL</TableCell>
            <TableCell sx={headCellSx}>Original URL</TableCell>
            <TableCell sx={headCellSx} align="right">
              Clicks
            </TableCell>
            <TableCell sx={headCellSx}>Created</TableCell>
            <TableCell sx={headCellSx} align="right">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {urls.map((item) => {
            const link = shortLink(item);
            return (
              <TableRow key={item.id} hover sx={{ "&:last-child td": { borderBottom: 0 } }}>
                <TableCell sx={{ ...bodyCellSx, whiteSpace: "nowrap" }}>
                  <Typography
                    component="a"
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ fontFamily: MONO, fontSize: 13, fontWeight: 500, color: "primary.main", textDecoration: "none" }}
                  >
                    {stripProtocol(link)}
                  </Typography>
                </TableCell>
                <TableCell sx={{ ...bodyCellSx, maxWidth: 320 }}>
                  <Typography noWrap title={item.originalUrl} sx={{ fontSize: 14, color: MUTED_TEXT }}>
                    {item.originalUrl}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={bodyCellSx}>
                  <Typography sx={{ fontFamily: MONO, fontSize: 13, fontWeight: 500 }}>
                    {clicksOf(item).toLocaleString("en-US")}
                  </Typography>
                </TableCell>
                <TableCell sx={{ ...bodyCellSx, whiteSpace: "nowrap" }}>
                  <Typography sx={{ fontSize: 13, color: MUTED_TEXT }}>{formatDate(item.createdAt)}</Typography>
                </TableCell>
                <TableCell align="right" sx={bodyCellSx}>
                  <IconButton aria-label={`Copy ${stripProtocol(link)}`} onClick={() => onCopy(link)} sx={iconButtonSx}>
                    <ContentCopyIcon sx={{ fontSize: 15 }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
