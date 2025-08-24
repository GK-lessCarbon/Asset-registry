import { Router } from 'express';
import { createAsset, assignAsset, unassignAsset } from '../services/assetService';
import { getProvider } from '../data';
import { z } from 'zod';

const router = Router();
const provider = getProvider();

router.get('/', async (req, res) => {
  const assets = await provider.listAssets();
  res.json(assets);
});

router.post('/', async (req, res) => {
  try {
    const schema = z.object({
      device_type: z.string(),
      device_model: z.string(),
      serial_no: z.string(),
      ownership: z.string(),
      device_status: z.string().default('unassigned'),
      mdm_protection: z.string().default('none'),
      notes: z.string().optional(),
    });
    const data = schema.parse(req.body);
    const asset = await createAsset({ ...data });
    res.status(201).json(asset);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

router.post('/:id/assign', async (req, res) => {
  try {
    const schema = z.object({ user_id: z.string(), date: z.string(), remarks: z.string().optional(), actor: z.string() });
    const data = schema.parse(req.body);
    const assignment = await assignAsset(req.params.id, data.user_id, data.actor, data.date, data.remarks);
    res.status(201).json(assignment);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

router.post('/:id/unassign', async (req, res) => {
  try {
    const schema = z.object({ date: z.string(), remarks: z.string().optional(), actor: z.string() });
    const data = schema.parse(req.body);
    await unassignAsset(req.params.id, data.actor, data.date, data.remarks);
    res.status(200).json({ status: 'ok' });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

router.get('/:id/history', async (req, res) => {
  const assignments = await provider.listAssignmentsForAsset(req.params.id);
  res.json(assignments);
});

export default router;
