begin;

create index if not exists "VideoTagOnVideo_tagId_idx"
  on public."VideoTagOnVideo" ("tagId");

create index if not exists "VideoCategoryOnVideo_categoryId_idx"
  on public."VideoCategoryOnVideo" ("categoryId");

commit;
