/** Shared design tokens and style fragments for the dashboard UI. */
export const PAGE_BG = "#FAFAFC";
export const SURFACE_MUTED = "#F4F4F5";
export const MUTED_TEXT = "#71717A";
export const OUTLINE = "#E4E4E7";
export const PRIMARY_SOFT = "#F5F3FF";
export const ON_PRIMARY_SOFT = "#6B21A8";
export const MONO = '"JetBrains Mono", ui-monospace, Consolas, monospace';

/** Small square outlined icon button (copy, menu, close). */
export const iconButtonSx = {
  width: 32,
  height: 32,
  borderRadius: "8px",
  border: 1,
  borderColor: OUTLINE,
  color: MUTED_TEXT,
  "&:hover": { color: "text.primary", bgcolor: SURFACE_MUTED },
};

/** Rounded grey-outline text field used by the create and search inputs. */
export const outlinedFieldSx = (verticalPadding: string) => ({
  "& .MuiOutlinedInput-root": {
    bgcolor: PAGE_BG,
    borderRadius: "12px",
    fontSize: 14,
    "& fieldset": { borderColor: OUTLINE },
  },
  "& .MuiOutlinedInput-input": { py: verticalPadding },
});
