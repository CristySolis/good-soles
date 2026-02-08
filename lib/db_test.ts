import { supabase } from "@/lib/db";

async function test() {
  const { data, error } = await supabase.from("donations").select("*");
  console.log({ data, error });
}

test();
