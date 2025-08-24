import { Router } from 'express';
import { getProvider } from '../data';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { handleUserExit } from '../services/assetService';

const router = Router();
const provider = getProvider();

router.get('/', async (req, res) => {
  const users = await provider.listUsers();
  res.json(users);
});

router.post('/', async (req, res) => {
  try {
    const schema = z.object({
      employee_code: z.string(),
      name: z.string(),
      email: z.string(),
      department: z.string(),
      designation: z.string(),
      join_date: z.string(),
      status: z.enum(['active', 'inactive']).default('active'),
      is_byod_user: z.boolean().default(false),
    });
    const data = schema.parse(req.body);
    const user = {
      ...data,
      id: randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    await provider.createUser(user);
    res.status(201).json(user);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

router.patch('/:id/exit', async (req, res) => {
  try {
    const schema = z.object({ exit_date: z.string(), actor: z.string() });
    const data = schema.parse(req.body);
    const user = await provider.getUser(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.exit_date = data.exit_date;
    user.status = 'inactive';
    user.updated_at = new Date().toISOString();
    await provider.updateUser(user);
    await handleUserExit(user.id, data.exit_date, data.actor);
    res.status(200).json(user);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
