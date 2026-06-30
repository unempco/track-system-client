import type { PostgrestError } from '@supabase/supabase-js';

import { NotOkResponseError } from '@/core/errors';

export function supabaseErrorThrower(error: PostgrestError | null) {
  if (error) {
    throw new NotOkResponseError({
      title: error.name,
      detail: error.message,
      code: error.code || 'UnknownError',
      status: 500,
    });
  }
}
