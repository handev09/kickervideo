import { Helmet } from "react-helmet-async";
// @mui
import { Grid, Button, Container, Stack, Typography } from "@mui/material";
// components
import Iconify from "../components/iconify";
import {
  BlogPostCard,
  BlogPostsSort,
  BlogPostsSearch,
} from "../sections/@dashboard/blog";
// mock
import POSTS from "../_mock/blog";

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Popular" },
  { value: "oldest", label: "Oldest" },
];

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Expenses | VBudget </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Expenses
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#E05858FF",
              transition: "opacity 0.3s ease-in-out", // Adding a transition for smooth effect
              "&:hover": {
                opacity: 0.8, // Adjust the opacity value as needed
                backgroundColor: "#E05858FF",
              },
            }}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Expense
          </Button>
        </Stack>

        <Stack
          mb={5}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>

        {/* <Grid container spacing={3}>
          {POSTS.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid> */}
      </Container>
    </>
  );
}
